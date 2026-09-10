import SingleBlogView from '@/views/SingleBlogView'
import { SinglePressRoomResponse } from '@/types/contentType'

const getBlogBySlug = async (slug: string): Promise<SinglePressRoomResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[slug][$eq]=${slug}&filters[type][$eq]=blog&populate[0]=thumbnail&populate[1]=category&populate[2]=downloadDocument&populate[3]=content&populate[4]=content.logo&populate[5]=SEO&populate[6]=content.item&populate[7]=content.item.logo&populate[8]=content.gridSettings&populate[9]=content.sliderSettings`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      // El cuerpo trae el detalle de Strapi (por ejemplo, una clave de populate
      // inválida tras un cambio de esquema); sin él el error termina como un
      // "Blog no encontrado" silencioso.
      const detail = await response.text().catch(() => "");
      throw new Error(`HTTP error! status: ${response.status} - ${detail}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export default async function SingleBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);
  const blogData = response?.data?.[0] || null;

  console.log("blogData", blogData);

  if (!blogData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-h2 text-text-primary">Blog no encontrado</h1>
      </div>
    );
  }

  return (
    <SingleBlogView blog={blogData} />
  )
}
