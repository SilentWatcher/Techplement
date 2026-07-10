import { useState, useEffect } from 'react'
import Navbar from '../components/portfolio/Navbar.jsx'
import Home from '../components/portfolio/Home.jsx'
import About from '../components/portfolio/About.jsx'
import ToolsTech from '../components/portfolio/ToolsTech.jsx'
import Projects from '../components/portfolio/Projects.jsx'
import Footer from '../components/portfolio/Footer.jsx'
import Cursor from '../components/portfolio/Cursor.jsx'
import Loading from '../components/shared/Loading.jsx'
import { getProfile, getProjects } from '../api/client.js'
import fallbackProfile from '../data/fallbackProfile.js'
import fallbackProjects from '../data/fallbackProjects.js'

export default function Portfolio() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [p, pr] = await Promise.all([getProfile(), getProjects()])
        setProfile(p)
        setProjects(pr)
      } catch {
        setProfile(fallbackProfile)
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Loading />

  return (
    <main>
      <Cursor />
      <Navbar email={profile.email} />
      <Home profile={profile} />
      <About profile={profile} />
      <ToolsTech profile={profile} />
      <Projects projects={projects} />
      <Footer profile={profile} />
    </main>
  )
}
