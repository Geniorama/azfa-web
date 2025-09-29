import InvestmentStatisticsView from '@/views/InvestmentStatisticsView'
import { InvestmentStatisticsResponse } from '@/types/contentType'

const getPageContent = async (): Promise<InvestmentStatisticsResponse | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/investment-statistics-page?populate[0]=heroBackground&populate[1]=ctaSection&populate[2]=ctaSection.button&populate[3]=iframeCollection&populate[4]=iframeCollection.desktopIframe&populate[5]=iframeCollection.mobileIframe`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: InvestmentStatisticsResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching page content:", error)
    return null
  }
}

export default async function Estadisticas() {
  const response = await getPageContent()
  const pageContent = response?.data || null

  return (
    <div>
      <InvestmentStatisticsView pageContent={pageContent} />
    </div>
  )
}
