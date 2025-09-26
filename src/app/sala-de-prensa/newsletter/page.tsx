import NewsletterView from '@/views/NewsletterView';
import { Metadata } from "next";
import { NewsType, NewsCategoryType } from "@/types/componentsType";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Newsletter - AZFA | Asociación de Zonas Francas de Iberoamérica",
    description:
      "Revise boletines informativos con actualizaciones exclusivas, iniciativas y oportunidades de interés en el ecosistema de zonas francas",
  };
}

// Interfaz extendida para newsletters con downloadDocument
interface NewsletterType extends NewsType {
  downloadDocument?: {
    url: string;
    alternativeText?: string;
  };
}

// Función para obtener newsletters desde Strapi
const getNewsletters = async (page: number = 1, pageSize: number = 9): Promise<{ data: NewsletterType[], meta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } } | null> => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=newsletter&populate[0]=thumbnail&populate[1]=category&populate[2]=downloadDocument&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
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
    console.error("Error fetching newsletters:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

// Función para obtener categorías de newsletters desde las newsletters existentes
const getNewsletterCategories = async (): Promise<{ data: NewsCategoryType[] } | null> => {
  try {
    // Obtener todas las newsletters para extraer las categorías únicas
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/press-rooms?filters[type][$eq]=newsletter&populate[0]=category&populate[1]=downloadDocument&fields[0]=externalLink&pagination[pageSize]=100`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extraer categorías únicas de las newsletters
    const categories = data.data
      ?.map((newsletter: NewsletterType) => newsletter.category)
      .filter((category: NewsCategoryType | null, index: number, self: NewsCategoryType[]) => 
        category && self.findIndex(c => c?.id === category.id) === index
      ) || [];

    return { data: categories };
  } catch (error) {
    console.error("Error fetching newsletter categories:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

export default async function Newsletter() {
  const newsletterData = await getNewsletters();
  const categoriesData = await getNewsletterCategories();

  console.log("newsletterData", newsletterData);
  console.log("categoriesData", categoriesData);

  return (
    <NewsletterView 
      newsletterData={newsletterData?.data || []}
      categoriesData={categoriesData?.data || []}
      paginationMeta={newsletterData?.meta || null}
    />
  )
}
