import StudiesView from "@/views/StudiesView";
import { StudiesResponse, StudyType } from "@/types/contentType";

const getStudies = async (): Promise<StudiesResponse | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/studies?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: StudiesResponse = await response.json()
    console.log('Estudios desde API:', data.data?.map((s: StudyType) => ({ title: s.title, date: s.publishDate })))
    return data
  } catch (error) {
    console.error("Error fetching studies:", error)
    return null
  }
}

export default async function EstudiosAzfa() {
  const response = await getStudies()
  const studies = response?.data || null

  return (
    <StudiesView studies={studies} />
  )
}
