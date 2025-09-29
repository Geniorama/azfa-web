import QuienesSomosView from "@/views/QuienesSomosView"
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Quiénes somos - AZFA | Asociación de Zonas Francas de Iberoamérica",
    description: "Conoce a la Asociación de Zonas Francas de Iberoamérica y sus objetivos",
  };
}

const getQuienesSomos = async () => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/about-us-page?populate[0]=hero&populate[1]=hero.button&populate[2]=hero.backgroundImg&populate[3]=teamTabsSection&populate[4]=teamTabsSection.boardOfDirectorsTab.icon&populate[5]=teamTabsSection.boardOfDirectorsTab.icon.customImage&populate[6]=teamTabsSection.committeesTab.icon&populate[7]=teamTabsSection.committeesTab.icon.customImage&populate[8]=teamTabsSection.azfaTeamTab.icon&populate[9]=teamTabsSection.azfaTeamTab.icon.customImage`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quienes somos:", error);
    return null;
  }
}

const getTeamMembers = async () => {
  try {
    // Verificar que la URL de Strapi esté disponible
    if (!process.env.STRAPI_URL) {
      console.error("STRAPI_URL environment variable is not set");
      return { data: [], meta: {} };
    }

    // Obtener todos los miembros con todos los campos necesarios
    const response = await fetch(`${process.env.STRAPI_URL}/api/team-members?populate[0]=photo&pagination[pageSize]=200&sort=id:asc`, {
      cache: "force-cache", // Usar cache para evitar errores de build
      next: { revalidate: 3600 }, // Revalidar cada hora
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API team-members response:", data);
    console.log("Total members from API:", data.data?.length || 0);
    
    // Debug: Ver los primeros miembros para verificar estructura
    if (data.data && data.data.length > 0) {
      console.log("Primer miembro de ejemplo:", data.data[0]);
      console.log("Campos disponibles:", Object.keys(data.data[0]));
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    // Retornar datos vacíos en lugar de null para evitar errores de renderizado
    return { data: [], meta: {} };
  }
}

export default async function QuienesSomos() {
  const aboutUsPage = await getQuienesSomos();
  const hero = aboutUsPage?.data?.hero;
  
  const teamMembersResponse = await getTeamMembers();
  const teamMembersData = teamMembersResponse?.data || [];
  
  const teamTabsSection = aboutUsPage?.data?.teamTabsSection;
  
  return (
    <QuienesSomosView 
      hero={hero} 
      teamMembersData={teamMembersData}
      tabsSection={teamTabsSection}
    />
  )
}