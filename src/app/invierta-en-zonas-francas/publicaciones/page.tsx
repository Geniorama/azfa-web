import PublicacionesView from '@/views/PublicacionesView'
import type { PublicationPageType, PublicationsResponseType } from '@/types/componentsType'

const getPageData = async (): Promise<PublicationPageType | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/publication-page?populate[0]=headingSection&populate[1]=headingSection.backgroundImg`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching page data:", error)
    return null
  }
}

const getPublications = async (): Promise<PublicationsResponseType | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/publications?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("Error fetching publications:", error)
    return null
  }
}

export default async function Publicaciones() {
  const pageData = await getPageData()
  const publications = await getPublications()
  console.log("publications", publications)

  return (
    <PublicacionesView 
      pageData={pageData} 
      publications={publications}
    />
  )
}