import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/portfolio/Navbar.jsx'
import Home from '../../components/portfolio/Home.jsx'
import About from '../../components/portfolio/About.jsx'
import ToolsTech from '../../components/portfolio/ToolsTech.jsx'
import Projects from '../../components/portfolio/Projects.jsx'
import Footer from '../../components/portfolio/Footer.jsx'
import Cursor from '../../components/portfolio/Cursor.jsx'

function upsertMeta(name, content, attribute = 'name') {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function PortfolioLayout({ content }) {
  const { settings, profile, projects, tech } = content
  const location = useLocation()

  useEffect(() => {
    const seo = settings?.seo || {}
    if (seo.title) document.title = seo.title
    upsertMeta('description', seo.description)
    upsertMeta('keywords', seo.keywords)
    upsertMeta('og:title', seo.title, 'property')
    upsertMeta('og:description', seo.description, 'property')
    upsertMeta('og:image', seo.ogImage, 'property')

    if (seo.favicon) {
      let icon = document.head.querySelector('link[rel="icon"]')
      if (!icon) {
        icon = document.createElement('link')
        icon.rel = 'icon'
        document.head.appendChild(icon)
      }
      icon.href = seo.favicon
    }
  }, [settings, location.pathname])

  return (
    <main>
      <Cursor />
      <Navbar settings={settings} profile={profile} />
      <Home profile={profile} section={settings.hero} />
      <About profile={profile} section={settings.about} />
      <ToolsTech tech={tech} section={settings.tech} />
      <Projects projects={projects} section={settings.projects} />
      <Footer profile={profile} section={settings.footer} />
    </main>
  )
}
