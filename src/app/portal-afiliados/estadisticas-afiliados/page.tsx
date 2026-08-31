import AffiliateStatisticsView from "@/views/AffiliateStatisticsView";
import { AffiliateInvestmentStatisticsResponse } from "@/types/contentType";
import { fetchAsUser } from "@/lib/serverAuth";

const QUERY =
  "/affiliate-portal-investment-statistics-page?populate[0]=heroBackground&populate[1]=ctaSection&populate[2]=ctaSection.button&populate[3]=iframeCollection&populate[4]=iframeCollection.desktopIframe&populate[5]=iframeCollection.mobileIframe";

/**
 * Contenido exclusivo del portal, así que se pide con el JWT del usuario y no
 * de forma anónima, igual que estudios y gestión.
 *
 * Se pierde el `revalidate: 3600` que tenía antes: la petición ahora lleva
 * credenciales y cachearla compartiría la respuesta entre usuarios. El coste es
 * una llamada al CMS por visita a una página de acceso restringido, que es
 * tráfico bajo.
 */
export default async function EstadisticasAfiliados() {
  const response = await fetchAsUser<AffiliateInvestmentStatisticsResponse>(QUERY);
  const pageContent = response?.data || null;

  return <AffiliateStatisticsView pageContent={pageContent} />;
}
