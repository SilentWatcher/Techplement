import { useSearchParams } from 'react-router-dom'
import Loading from '../components/shared/Loading.jsx'
import { useContent } from '../context/ContentContext.jsx'
import { getDesign } from '../content/designs.js'

export default function Portfolio() {
  const { content, loading } = useContent()
  const [searchParams] = useSearchParams()

  if (loading || !content) return <Loading />

  const requestedDesign = searchParams.get('design')
  const design = getDesign(requestedDesign || content.settings?.designId)
  const Layout = design.component

  return <Layout content={content} />
}
