import HomeView from "@/views/HomeView";
import { Metadata } from "next";
import { fetchStrapi } from "@/utils/strapiClient";
import { ContentResponse } from "@/types/contentType";

export async function generateMetadata(): Promise<Metadata> {
  const populateFields = [
    'sections',
    'sections.slides',
    'sections.slides.icon',
    'sections.slides.content',
    'sections.slides.content.backgroundImg',
    'sections.intro',
    'sections.intro.icon',
    'sections.two-columns-section',
    'sections.two-columns-section.cover',
    'sections.two-columns-section.uploadedVideo'
  ];
  
  const result = await getContentBySlug("home", populateFields);

  console.log("result", result);

  return {
    title: "AZFA - Asociación de Zonas Francas de Iberoamérica",
    description:
      "Descubre las oportunidades de inversión en zonas francas de Iberoamérica",
  };
}

async function getContentBySlug(slug: string, populateFields: string[]) {
  const result = await fetchStrapi<ContentResponse>('/api/contents', {
    filters: {
      slug: { $eq: slug }
    },
    populate: populateFields
  });

  if (result.success) {
    console.log("Strapi response:", result.data);
  } else {
    console.error("Error fetching content:", result.error);
  }

  return result;
}

export default async function Home() {
  const populateFields = [
    'sections',
    'sections.slides',
    'sections.slides.icon',
    'sections.slides.content',
    'sections.slides.content.backgroundImg',
    'sections.intro',
    'sections.intro.icon',
    'sections.cover',
    'sections.uploadedVideo',
    'sections.video.thumbnail',
    'sections.video.uploadedVideo',
  ];
  
  const result = await getContentBySlug("home", populateFields);

  console.log("content result:", result);

  if (result.success && result.data?.data?.[0]) {
    const contentData = result.data.data[0] as unknown as Record<string, unknown>;
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
