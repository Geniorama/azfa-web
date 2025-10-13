"use client";

import { FiShare2 } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardInfoPortal from "@/components/CardInfoPortal";
import { PressRoomType } from "@/types/contentType";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { truncateText } from "@/utils/truncateText";

interface SingleBlogViewProps {
  blog: PressRoomType;
}

export default function SingleBlogView({ blog }: SingleBlogViewProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<PressRoomType[]>([]);

  useEffect(() => {
    // Fetch related blogs
    const fetchRelatedBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/press-rooms?filters[type][$eq]=blog&filters[slug][$ne]=${blog.slug}&filters[category][id][$eq]=${blog.category?.id}&populate[0]=thumbnail&populate[1]=category&sort[0]=publishDate:desc&pagination[pageSize]=6`,
          {
            cache: "no-store",
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setRelatedBlogs(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchRelatedBlogs();
  }, [blog.slug, blog.category?.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.extract,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  const formatDate = (dateString: string) => {
    // Crear la fecha especificando que es UTC para evitar problemas de zona horaria
    const date = new Date(dateString + 'T00:00:00.000Z');
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC' // Forzar UTC para evitar desfases
    });
  };
  return (
    <div>
      <section className='py-12 2xl:py-16' style={{ background: 'linear-gradient(to bottom, var(--color-primary) 50%, white 50%)' }}>
        <div className="flex gap-0">
          <div className="w-1/2 p-12 pr-0">
            {/* Image */}
            <img
              className="w-full h-full object-cover aspect-[10/7] rounded-tr-4xl overflow-hidden translate-x-16"
              src={blog.thumbnail?.url || "/placeholder-image.jpg"} 
              alt={blog.thumbnail?.alternativeText || blog.title} 
            />
          </div>
          <div className="w-1/2 bg-background-2">
            <div className="p-8 h-full flex flex-col gap-8 justify-center text-text-primary pl-28">
              <h1 className="text-h3">{blog.title}</h1>
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {blog.category && (
                  <span 
                    className="text-caption bg-white rounded-full px-4 py-1 text-text-primary"
                  >
                    {blog.category.name}
                  </span>
                )}
                {/* Tag Date */}
                {blog.publishDate && (
                  <span className="text-caption bg-transparent border border-text-primary text-text-primary rounded-full px-4 py-1">
                    {formatDate(blog.publishDate)}
                  </span>
                )}
              </div>
              <hr className="border-details w-32" />
              {/* Icon share */}
              <div className="flex gap-2">
                <button 
                  onClick={handleShare}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Compartir artículo"
                >
                  <FiShare2 className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic content */}
      <article className="py-16 2xl:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Extract/Introduction */}
          {blog.extract && (
            <div className="mb-12">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
              >
                {blog.extract}
              </ReactMarkdown>
            </div>
          )}

          {/* Dynamic zone content */}
          {blog.content && blog.content.length > 0 && (
            <div className="space-y-8">
              {blog.content.map((component, index) => {
                switch (component.__component) {
                  case 'components.rich-text':
                    return (
                      <div key={index}>
                        <ReactMarkdown 
                          rehypePlugins={[rehypeRaw]}
                        >
                          {component.content || ''}
                        </ReactMarkdown>
                      </div>
                    );
                  
                  case 'components.video':
                    return (
                      <div key={index} className="my-8">
                        {component.videoType === 'youtube' && component.youtubeUrl && (
                          <div className="aspect-video">
                            <iframe
                              className="w-full h-full rounded-lg"
                              src={component.youtubeUrl}
                              title={component.title || 'Video'}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    );
                  
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      </article>

      {/* Related blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-background-1">
          <div className="container mx-auto px-4">
            {/* Swiper */}
            <div className="relative">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-h3 text-text-primary">Contenido relacionado</h2>
                <div className="flex justify-end gap-4 z-10">
                  <div className="[&>button]:border-text-primary [&>button]:text-text-primary">
                    <button className="custom-swiper-button-prev bg-transparent border text-lg border-text-primary text-text-primary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="[&>button]:border-text-primary [&>button]:text-text-primary">
                    <button className="custom-swiper-button-next bg-transparent border text-lg border-text-primary text-text-primary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: '.custom-swiper-button-next',
                  prevEl: '.custom-swiper-button-prev',
                }}
                className="swiper-custom !p-0 !pb-10"
                loop={relatedBlogs.length > 3}
                speed={1000}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {relatedBlogs.map((relatedBlog) => (
                  <SwiperSlide key={relatedBlog.id}>
                    <CardInfoPortal
                      image={relatedBlog.thumbnail?.url || "/placeholder-image.jpg"}
                      title={relatedBlog.title}
                      description={truncateText(relatedBlog.extract, 100)}
                      tags={relatedBlog.category ? [relatedBlog.category.name] : []}
                      date={relatedBlog.publishDate || relatedBlog.publishedAt}
                      noSpaceImage={true}
                      button={{
                        label: "Leer artículo",
                        onClick: () => {
                          window.location.href = `/sala-de-prensa/blog/${relatedBlog.slug}`;
                        },
                      }}
                      isReadMore={true}
                      arrowColor="text-details"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
