import HomeView from "@/views/HomeView";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const result = await getContentBySlug("home");
  
  if (result.success && result.data?.data?.[0]) {
    const content = result.data.data[0];
    const heading = content.heading || {};
    
    return {
      title: heading.title || "AZFA - Asociación de Zonas Francas de Iberoamérica",
      description: heading.description || "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
      keywords: "zonas francas, inversión, iberoamérica, AZFA, comercio internacional",
      openGraph: {
        title: heading.title || "AZFA - Asociación de Zonas Francas de Iberoamérica",
        description: heading.description || "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
        type: "website",
        locale: "es_ES",
      },
      twitter: {
        card: "summary_large_image",
        title: heading.title || "AZFA - Asociación de Zonas Francas de Iberoamérica",
        description: heading.description || "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
      },
    };
  }
  
  return {
    title: "AZFA - Asociación de Zonas Francas de Iberoamérica",
    description: "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
  };
}

async function getContentBySlug(slug: string) {
  try {
    // ✅ CORRECTO: Llamada directa a Strapi desde el servidor
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(
      `${strapiUrl}/api/contents?filters[slug][$eq]=${slug}&populate[0]=sections&populate[1]=sections.slides&populate[2]=sections.slides.icon&populate[3]=sections.slides.content&populate[4]=sections.slides.content.backgroundImg`,
      

      // Cache para testing
      // { 
      //   cache: 'force-cache', // Cache para producción
      //   next: { revalidate: 3600 } // Revalidar cada 12 horas
      // }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Strapi response:", data);
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default async function Home() {
  const result = await getContentBySlug("home");

  console.log("content result:", result);

  if (result.success && result.data?.data?.[0]) {
    const contentData = result.data.data[0];
    return <HomeView content={contentData} />;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error al cargar el contenido
          </h1>
          <p className="text-gray-600">
            {result.error || "No se pudo obtener el contenido de la página"}
          </p>
        </div>
      </div>
    );
  }
}