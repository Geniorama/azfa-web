import StudiesView from "@/views/StudiesView";
import { StudiesResponse } from "@/types/contentType";

const getStudies = async (): Promise<StudiesResponse | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/studies?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: StudiesResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching studies:", error)
    return null
  }
}

export default async function Publicaciones() {
  const response = await getStudies()
  const studies = response?.data || null

  return (
    <StudiesView studies={studies} />
  )
}