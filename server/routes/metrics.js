import { Router } from 'express'
import mongoose from 'mongoose'
import Metric from '../models/Metric.js'
import Visitor from '../models/Visitor.js'
import VisitorDay from '../models/VisitorDay.js'
import RecentView from '../models/RecentView.js'
import Like from '../models/Like.js'
import Project from '../models/Project.js'
import auth from '../middleware/auth.js'
import rateLimit from '../middleware/rateLimit.js'

const router = Router()

const DEDUPE_MS = 30 * 60 * 1000

function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function daysAgoKey(days) {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - days)
  return date.toISOString().slice(0, 10)
}

function validVisitorId(value) {
  return typeof value === 'string' && value.length >= 8 && value.length <= 120
}

async function publicMetrics(visitorId) {
  const [siteViewRows, projectViewRows, projectLikeRows, siteLikes, totalVisitors, likedRows] =
    await Promise.all([
      Metric.aggregate([{ $match: { scope: 'site' } }, { $group: { _id: null, views: { $sum: '$views' } } }]),
      Metric.aggregate([
        { $match: { scope: 'project' } },
        {
          $group: {
            _id: '$targetId',
            views: { $sum: '$views' },
            uniqueVisitors: { $sum: '$uniqueVisitors' },
          },
        },
      ]),
      Like.aggregate([
        { $match: { scope: 'project' } },
        { $group: { _id: '$targetId', likes: { $sum: 1 } } },
      ]),
      Like.countDocuments({ scope: 'site' }),
      Visitor.countDocuments(),
      visitorId ? Like.find({ visitorId }).lean() : [],
    ])

  const projects = {}
  for (const row of projectViewRows) {
    projects[row._id] = {
      views: row.views || 0,
      uniqueVisitors: row.uniqueVisitors || 0,
      likes: 0,
      liked: false,
    }
  }
  for (const row of projectLikeRows) {
    projects[row._id] = projects[row._id] || {
      views: 0,
      uniqueVisitors: 0,
      likes: 0,
      liked: false,
    }
    projects[row._id].likes = row.likes || 0
  }

  const likedSite = likedRows.some((row) => row.scope === 'site')
  for (const row of likedRows) {
    if (row.scope === 'project' && projects[row.targetId]) {
      projects[row.targetId].liked = true
    }
  }

  return {
    site: {
      views: siteViewRows[0]?.views || 0,
      uniqueVisitors: totalVisitors,
      likes: siteLikes,
      liked: likedSite,
    },
    projects,
  }
}

async function trackView({ visitorId, scope, targetId }) {
  const now = new Date()
  const date = dayKey(now)

  const recent = await RecentView.findOne({ visitorId, scope, targetId }).lean()
  if (recent && now.getTime() - new Date(recent.lastAt).getTime() < DEDUPE_MS) {
    return false
  }

  await RecentView.findOneAndUpdate(
    { visitorId, scope, targetId },
    { $set: { lastAt: now } },
    { upsert: true }
  )

  let unique = false
  try {
    await VisitorDay.create({ visitorId, scope, targetId, date })
    unique = true
  } catch (err) {
    if (err.code !== 11000) throw err
  }

  await Metric.findOneAndUpdate(
    { scope, targetId, date },
    { $inc: { views: 1, uniqueVisitors: unique ? 1 : 0 } },
    { upsert: true }
  )
  return true
}

router.get('/public', async (req, res) => {
  try {
    const visitorId = validVisitorId(req.query.visitorId) ? req.query.visitorId : null
    res.json(await publicMetrics(visitorId))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/view', rateLimit({ windowMs: 60_000, max: 40 }), async (req, res) => {
  try {
    const { visitorId, projectId } = req.body || {}
    if (!validVisitorId(visitorId)) {
      return res.status(400).json({ message: 'Invalid visitorId' })
    }

    const now = new Date()
    await Visitor.findOneAndUpdate(
      { visitorId },
      { $set: { lastSeen: now }, $setOnInsert: { firstSeen: now } },
      { upsert: true }
    )

    await trackView({ visitorId, scope: 'site', targetId: null })

    if (projectId && mongoose.isValidObjectId(projectId)) {
      const exists = await Project.exists({ _id: projectId })
      if (exists) {
        await trackView({ visitorId, scope: 'project', targetId: String(projectId) })
      }
    }

    res.json(await publicMetrics(visitorId))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/like', rateLimit({ windowMs: 60_000, max: 60 }), async (req, res) => {
  try {
    const { visitorId, targetType, targetId } = req.body || {}
    if (!validVisitorId(visitorId) || !['site', 'project'].includes(targetType)) {
      return res.status(400).json({ message: 'Invalid like payload' })
    }

    const scope = targetType
    const normalizedTarget = scope === 'project' ? String(targetId || '') : null
    if (scope === 'project' && !mongoose.isValidObjectId(normalizedTarget)) {
      return res.status(400).json({ message: 'Invalid projectId' })
    }

    const existing = await Like.findOne({ visitorId, scope, targetId: normalizedTarget })
    let liked
    if (existing) {
      await existing.deleteOne()
      liked = false
    } else {
      try {
        await Like.create({ visitorId, scope, targetId: normalizedTarget })
      } catch (err) {
        if (err.code !== 11000) throw err
      }
      liked = true
    }

    const likes = await Like.countDocuments({ scope, targetId: normalizedTarget })
    res.json({ scope, targetId: normalizedTarget, liked, likes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/admin/summary', auth, async (req, res) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 30, 7), 365)
    const fromDate = daysAgoKey(days - 1)
    const today = dayKey()

    const [
      siteMetrics,
      projectViewRows,
      projectLikeRows,
      allSiteViews,
      totalVisitors,
      totalSiteLikes,
      todayMetric,
      rangeUnique,
      siteLikeDocs,
      allProjects,
    ] = await Promise.all([
      Metric.find({ scope: 'site', date: { $gte: fromDate } }).lean(),
      Metric.aggregate([
        { $match: { scope: 'project', date: { $gte: fromDate } } },
        {
          $group: {
            _id: '$targetId',
            views: { $sum: '$views' },
            uniqueVisitors: { $sum: '$uniqueVisitors' },
          },
        },
      ]),
      Like.aggregate([
        { $match: { scope: 'project' } },
        { $group: { _id: '$targetId', likes: { $sum: 1 } } },
      ]),
      Metric.aggregate([{ $match: { scope: 'site' } }, { $group: { _id: null, views: { $sum: '$views' } } }]),
      Visitor.countDocuments(),
      Like.countDocuments({ scope: 'site' }),
      Metric.findOne({ scope: 'site', date: today }).lean(),
      VisitorDay.distinct('visitorId', { scope: 'site', date: { $gte: fromDate } }),
      Like.find({ scope: 'site', createdAt: { $gte: new Date(`${fromDate}T00:00:00.000Z`) } })
        .select('createdAt')
        .lean(),
      Project.find().select('title image ispublished').lean(),
    ])

    const byDate = new Map()
    for (const metric of siteMetrics) {
      byDate.set(metric.date, metric)
    }
    const likesByDate = new Map()
    for (const like of siteLikeDocs) {
      const key = dayKey(new Date(like.createdAt))
      likesByDate.set(key, (likesByDate.get(key) || 0) + 1)
    }

    const daily = []
    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date()
      date.setUTCDate(date.getUTCDate() - i)
      const key = dayKey(date)
      const metric = byDate.get(key)
      daily.push({
        date: key,
        views: metric?.views || 0,
        uniqueVisitors: metric?.uniqueVisitors || 0,
        likes: likesByDate.get(key) || 0,
      })
    }

    const likeMap = new Map(projectLikeRows.map((row) => [String(row._id), row.likes]))
    const viewMap = new Map(projectViewRows.map((row) => [String(row._id), row]))
    const ids = new Set([...likeMap.keys(), ...viewMap.keys()])
    const projects = allProjects
      .filter((project) => ids.has(String(project._id)))
      .map((project) => ({
        _id: String(project._id),
        title: project.title,
        image: project.image,
        ispublished: project.ispublished !== false,
        views: viewMap.get(String(project._id))?.views || 0,
        uniqueVisitors: viewMap.get(String(project._id))?.uniqueVisitors || 0,
        likes: likeMap.get(String(project._id)) || 0,
      }))
      .sort((a, b) => b.views - a.views)

    res.json({
      range: { days, from: fromDate, to: today },
      totals: {
        views: allSiteViews[0]?.views || 0,
        uniqueVisitors: totalVisitors,
        likes: totalSiteLikes,
        viewsToday: todayMetric?.views || 0,
        uniqueVisitorsInRange: rangeUnique.length,
      },
      daily,
      projects,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
