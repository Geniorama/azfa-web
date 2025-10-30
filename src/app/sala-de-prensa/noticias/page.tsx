import NoticiasView from "@/views/NoticiasView";
import { Metadata } from "next";
import { NewsType, NewsCategoryType, PressRoomPageType } from "@/types/componentsType";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Noticias - AZFA | Asociación de Zonas Francas de Iberoamérica",
    description:
      "Mantente informado con las últimas noticias y acontecimientos del ecosistema de zonas francas en Iberoamérica",
  };
}

// Función para obtener noticias desde Strapi
const getNews = async (page: number = 1, pageSize: number = 9): Promise<{ data: NewsType[], meta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } } | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=news&populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&fields[8]=publishDate&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishDate:desc`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

// Función para obtener TODAS las noticias sin paginación (para filtros y categorías)
const getAllNews = async (): Promise<{ data: NewsType[] } | null> => {
  try {
    // Obtener todas las noticias con un límite alto
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=news&populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&fields[8]=publishDate&pagination[pageSize]=1000&sort=publishDate:desc`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Si hay más resultados, hacer paginación para obtenerlos todos
    if (data.meta?.pagination?.pageCount > 1) {
      const allData = [...data.data];
      const totalPages = data.meta.pagination.pageCount;
      
      // Obtener las páginas restantes
      for (let page = 2; page <= totalPages; page++) {
        const pageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=news&populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&fields[8]=publishDate&pagination[page]=${page}&pagination[pageSize]=1000&sort=publishDate:desc`,
          {
            cache: "force-cache",
            next: { revalidate: 3600 },
          }
        );
        
        if (pageResponse.ok) {
          const pageData = await pageResponse.json();
          allData.push(...pageData.data);
        }
      }
      
      return { data: allData };
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching all news:", error);
    return null;
  }
};

// Función para obtener categorías de noticias desde las noticias existentes
const getNewsCategories = async (allNews: NewsType[]): Promise<{ data: NewsCategoryType[] }> => {
  // Extraer categorías únicas de todas las noticias
  const categories = allNews
    .map((news: NewsType) => news.category)
    .filter((category: NewsCategoryType | null, index: number, self: (NewsCategoryType | null)[]) => 
      category && self.findIndex(c => c?.id === category.id) === index
    ) || [];

  return { data: categories };
};

// Función común para obtener datos de la página de sala de prensa
const getPressRoomPage = async (): Promise<{ data: PressRoomPageType } | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/press-room-page?populate[0]=blogSection&populate[1]=blogSection.backgroundImg&populate[2]=newsletterSection&populate[3]=newsletterSection.backgroundImg&populate[4]=podcastSection&populate[5]=podcastSection.backgroundImg&populate[6]=newsSection&populate[7]=newsSection.backgroundImg`, {
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

interface NoticiasPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Noticias({ searchParams }: NoticiasPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  
  // Obtener todas las noticias para filtros y categorías
  const allNewsData = await getAllNews();
  const allNews = allNewsData?.data || [];
  
  // Obtener noticias paginadas para mostrar (cuando no hay filtros)
  const newsData = await getNews(currentPage);
  
  // Obtener categorías desde todas las noticias
  const categoriesData = await getNewsCategories(allNews);
  const pressRoomPageData = await getPressRoomPage();

  return (
    <NoticiasView 
      newsData={newsData?.data || []} // Noticias paginadas del servidor (sin filtros)
      allNewsData={allNews} // Todas las noticias (para cuando hay filtros)
      categoriesData={categoriesData?.data || []}
      paginationMeta={newsData?.meta || null}
      newsSectionData={pressRoomPageData?.data?.newsSection || null}
    />
  )
}
