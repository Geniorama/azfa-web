import AffiliateStatisticsView from "@/views/AffiliateStatisticsView";
import { AffiliateInvestmentStatisticsResponse } from "@/types/contentType";

const getAffiliateStatistics = async (): Promise<AffiliateInvestmentStatisticsResponse | null> => {
  try {
    // Verificar que la URL de Strapi esté disponible
    if (!process.env.STRAPI_URL) {
      console.error("STRAPI_URL environment variable is not set");
      return { data: null, meta: {} };
    }

    const response = await fetch(`${process.env.STRAPI_URL}/api/affiliate-portal-investment-statistics-page?populate[0]=heroBackground&populate[1]=ctaSection&populate[2]=ctaSection.button&populate[3]=iframeCollection&populate[4]=iframeCollection.desktopIframe&populate[5]=iframeCollection.mobileIframe`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AffiliateInvestmentStatisticsResponse = await response.json();
    console.log("API affiliate-portal-investment-statistics-page response:", data);
    console.log("API iframeCollection:", data.data?.iframeCollection);
    return data;
  } catch (error) {
    console.error("Error fetching affiliate statistics:", error);
    return { data: null, meta: {} };
  }
};

export default async function EstadisticasAfiliados() {
  const response = await getAffiliateStatistics();
  const pageContent = response?.data || null;

  return (
    <AffiliateStatisticsView pageContent={pageContent} />
  );
}