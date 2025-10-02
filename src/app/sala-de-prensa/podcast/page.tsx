import PodcastView from "@/views/PodcastView";
import { PressRoomPageType } from "@/types/componentsType";

// Función común para obtener datos de la página de sala de prensa
const getPressRoomPage = async (): Promise<{ data: PressRoomPageType } | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/press-room-page?populate[0]=blogSection&populate[1]=blogSection.backgroundImg&populate[2]=newsletterSection&populate[3]=newsletterSection.backgroundImg&populate[4]=podcastSection&populate[5]=podcastSection.backgroundImg&populate[6]=newsSection&populate[7]=newsSection.backgroundImg`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching press room page:", error);
    return null;
  }
}

const getPodcast = async () => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=podcast&populate=*`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return null;
  }
}

export default async function Podcast() {
  const pressRoomPageData = await getPressRoomPage();
  const podcastData = await getPodcast();

  console.log("pressRoomPageData", pressRoomPageData);
  console.log("podcastData", podcastData);

  return (
    <PodcastView 
      podcastSectionData={pressRoomPageData?.data?.podcastSection || null}
      podcastData={podcastData?.data || []}
    />
  )
}
