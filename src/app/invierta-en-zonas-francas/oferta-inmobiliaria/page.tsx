import OfertaInmobiliariaView from "@/views/OfertaInmobiliariaView";
import { OfertaInmobiliariaResponse } from "@/types/contentType";

const getPageContent = async (): Promise<OfertaInmobiliariaResponse | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/real-state-offer-page?populate[0]=coverImage&populate[1]=suppliersLogos&populate[2]=suppliersLogos.logo&populate[3]=suppliersLogos.logo.logo&populate[4]=consultantsLogos&populate[5]=consultantsLogos.logo&populate[6]=consultantsLogos.logo.logo`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};

export default async function OfertaInmobiliaria() {
  const response = await getPageContent();
  const pageContent = response?.data || null;

  console.log("pageContent", response);

  return (
    <div>
      <OfertaInmobiliariaView pageContent={pageContent} />
     </div>
  );
}
