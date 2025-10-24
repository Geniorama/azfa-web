import BlogView from '@/views/BlogView';
import { Metadata } from "next";
import { NewsType, NewsCategoryType, PressRoomPageType } from "@/types/componentsType";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - AZFA | Asociación de Zonas Francas de Iberoamérica",
    description:
      "Descubra artículos, análisis y perspectivas sobre el ecosistema de zonas francas en Iberoamérica",
  };
}

// Interfaz extendida para blogs con downloadDocument
interface BlogType extends NewsType {
  downloadDocument?: {
    url: string;
    alternativeText?: string;
  };
}

// Función para obtener blogs desde Strapi
const getBlogs = async (page: number = 1, pageSize: number = 9): Promise<{ data: BlogType[], meta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } } | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=blog&populate[0]=thumbnail&populate[1]=category&populate[2]=downloadDocument&fields[0]=title&fields[1]=slug&fields[2]=extract&fields[3]=type&fields[4]=externalLink&fields[5]=createdAt&fields[6]=updatedAt&fields[7]=publishedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
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
    console.error("Error fetching blogs:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
};

// Función para obtener categorías de blogs desde los blogs existentes
const getBlogCategories = async (): Promise<{ data: NewsCategoryType[] } | null> => {
  try {
    // Obtener todos los blogs para extraer las categorías únicas
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=blog&populate[0]=category&populate[1]=downloadDocument&fields[0]=externalLink&pagination[pageSize]=100`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extraer categorías únicas de los blogs
    const categories = data.data
      ?.map((blog: BlogType) => blog.category)
      .filter((category: NewsCategoryType | null, index: number, self: NewsCategoryType[]) => 
        category && self.findIndex(c => c?.id === category.id) === index
      ) || [];

    return { data: categories };
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    // Retornar null en caso de error para que el componente maneje el fallback
    return null;
  }
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

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const blogData = await getBlogs(currentPage);
  const categoriesData = await getBlogCategories();
  const pressRoomPageData = await getPressRoomPage();

  return (
    <BlogView 
      blogData={blogData?.data || []}
      categoriesData={categoriesData?.data || []}
      blogPageData={pressRoomPageData?.data?.blogSection || null}
      paginationMeta={blogData?.meta || null}
    />
  )
}
