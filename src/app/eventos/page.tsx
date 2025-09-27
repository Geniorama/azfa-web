import EventosView from '@/views/EventosView'
import { EventType, EventsPageType } from '@/types/componentsType'

// Función para obtener eventos desde Strapi
const getEvents = async (): Promise<{ data: EventType[] } | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/events?populate[0]=featuredImage&populate[1]=calendarIcon&populate[2]=locationIcon&populate[3]=addressIcon&populate[4]=calendarIcon.customImage&populate[5]=locationIcon.customImage&populate[6]=addressIcon.customImage&pagination[pageSize]=100&sort=startDate:asc`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

// Función para obtener datos de la página de eventos
const getEventsPage = async (): Promise<{ data: EventsPageType } | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/events-page?populate[0]=headingSection&populate[1]=headingSection.backgroundImg`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events page:", error);
    return null;
  }
}

export default async function Eventos() {
  const eventsResponse = await getEvents();
  const eventsPageResponse = await getEventsPage();
  
  console.log("eventsData", eventsResponse);
  console.log("eventsPageData", eventsPageResponse);

  return (
    <EventosView 
      eventsData={eventsResponse?.data || []} 
      eventsPageData={eventsPageResponse?.data || null}
      isLoading={false}
      error={eventsResponse === null ? "Error al cargar los eventos" : null}
    />
  ) 
}
