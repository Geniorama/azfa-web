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
    const response = await fetch(`${process.env.STRAPI_URL}/api/team-members?populate=photo`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return null;
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