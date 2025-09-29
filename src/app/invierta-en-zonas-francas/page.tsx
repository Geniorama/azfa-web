import InviertaEnZonasView from '@/views/InviertaEnZonasView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invierta en Zonas Francas',
  description: 'Invierta en Zonas Francas',
}

const getPageContent = async () => {
  const response = await fetch(`${process.env.STRAPI_URL}/api/trade-zones-page?populate[0]=headingSection&populate[1]=headingSection.backgroundImg&populate[2]=about&populate[3]=about.coverImage&populate[4]=statistics&populate[5]=statistics.statistics&populate[6]=about2&populate[7]=about2.coverImage&populate[8]=benefits&populate[9]=benefits.coverImage`)
  const data = await response.json()
  return data
}

export default async function InviertaEnZonasFrancas() {
  const response = await getPageContent()
  const pageContent = response?.data || null

  console.log("invierta en zonas francas page content", pageContent)
  return (
    <InviertaEnZonasView pageContent={pageContent} />
  )
}
