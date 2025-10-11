import ManagementView from "@/views/ManagementView";
import { ManagementResponse, ManagementType } from "@/types/contentType";

const getManagement = async (): Promise<ManagementResponse | null> => {
  try {
    // Intentar primero con el endpoint de managements
    let response = await fetch(`${process.env.STRAPI_URL}/api/managements?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc`)
    
    // Si falla con 404, usar studies como fallback
    if (!response.ok && response.status === 404) {
      console.log("Managements API not found, using studies as fallback")
      response = await fetch(`${process.env.STRAPI_URL}/api/studies?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc`)
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Gestión desde API:', data.data?.map((m: ManagementType) => ({ title: m.title, date: m.publishDate })))
    
    // Convertir la respuesta de studies a management si es necesario
    const managementData: ManagementResponse = {
      data: data.data || [],
      meta: data.meta || {}
    }
    
    return managementData
  } catch (error) {
    console.error("Error fetching management:", error)
    return null
  }
}

export default async function GestionAzfa() {
  const response = await getManagement()
  const management = response?.data || null
  console.log("management", management)

  return (
    <ManagementView 
      management={management}
      title="Portal afiliados"
      smallTitle="Consulte reportes institucionales, memorias de gestión y documentos clave sobre el trabajo de la Asociación"
      image="/images/gestion-azfa.jpg"
      slug="gestion-azfa"
    />
  )
}
