import NoticiasView from "@/views/NoticiasView";
import { Metadata } from "next";
import { NewsType, NewsCategoryType } from "@/types/componentsType";

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
      `${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=news&populate[0]=thumbnail&populate[1]=category&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
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

// Función para obtener categorías de noticias desde las noticias existentes
const getNewsCategories = async (): Promise<{ data: NewsCategoryType[] } | null> => {
  try {
    // Obtener todas las noticias para extraer las categorías únicas
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=news&populate[0]=category&fields[0]=externalLink&pagination[pageSize]=100`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extraer categorías únicas de las noticias
    const categories = data.data
      ?.map((news: NewsType) => news.category)
      .filter((category: NewsCategoryType | null, index: number, self: NewsCategoryType[]) => 
        category && self.findIndex(c => c?.id === category.id) === index
      ) || [];

    return { data: categories };
  } catch (error) {
    console.error("Error fetching news categories:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

export default async function Noticias() {
  const newsData = await getNews();
  const categoriesData = await getNewsCategories();

  console.log("newsData", newsData);
  console.log("categoriesData", categoriesData);

  return (
    <NoticiasView 
      newsData={newsData?.data || []}
      categoriesData={categoriesData?.data || []}
      paginationMeta={newsData?.meta || null}
    />
  )
}
