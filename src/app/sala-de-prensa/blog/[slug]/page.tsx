import SingleBlogView from '@/views/SingleBlogView'
import { SinglePressRoomResponse } from '@/types/contentType'

const getBlogBySlug = async (slug: string): Promise<SinglePressRoomResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[slug][$eq]=${slug}&filters[type][$eq]=blog&populate[0]=thumbnail&populate[1]=category&populate[2]=downloadDocument&populate[3]=content&populate[4]=content.logo&populate[5]=content.logo.logo&populate[6]=content.button&populate[7]=SEO&populate[8]=content.item&populate[9]=content.item.logo&populate[10]=content.gridSettings&populate[11]=content.sliderSettings`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
