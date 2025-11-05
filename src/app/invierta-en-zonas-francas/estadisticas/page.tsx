import InvestmentStatisticsView from '@/views/InvestmentStatisticsView'
import { InvestmentStatisticsResponse } from '@/types/contentType'

const getPageContent = async (): Promise<InvestmentStatisticsResponse | null> => {
  try {
    const strapiUrl = process.env.STRAPI_URL
    
    if (!strapiUrl) {
      console.error('❌ STRAPI_URL no está configurado')
      return null
    }

    const url = `${strapiUrl}/api/investment-statistics-page?populate[0]=heroBackground&populate[1]=ctaSection&populate[2]=ctaSection.button&populate[3]=iframeCollection&populate[4]=iframeCollection.desktopIframe&populate[5]=iframeCollection.mobileIframe`
    
    console.log('🔍 Fetching from:', url.substring(0, 100) + '...')
    
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    })
    
    console.log('📡 Response status:', response.status)
    
    if (!response.ok) {
      console.error(`❌ HTTP error! status: ${response.status}`)
      return null
    }
    
    const data: InvestmentStatisticsResponse = await response.json()
    console.log('✅ Datos recibidos:', data ? 'Sí' : 'No')
    console.log('📊 iframeCollection:', data?.data?.iframeCollection?.length || 0)
    
    return data
  } catch (error) {
    console.error("❌ Error fetching page content:", error)
    return null
  }
}

export default async function Estadisticas() {
  const response = await getPageContent()
  const pageContent = response?.data || null

  console.log('🎯 PageContent en página:', pageContent ? 'Existe' : 'Null')

  return (
    <div>
      <InvestmentStatisticsView pageContent={pageContent} />
    </div>
  )
}
