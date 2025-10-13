"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import IntroPage from "@/components/IntroPage";
import Button from "@/utils/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface RenderPressRoomContentProps {
  componentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

// Función para convertir URLs de video a formato embebido
const convertToEmbedUrl = (url: string, type: string) => {
  if (type === "youtube") {
    // Convert YouTube URL to embed format
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  } else if (type === "vimeo") {
    // Convert Vimeo URL to embed format
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const match = url.match(vimeoRegex);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
  }
  return url;
};

export default function RenderPressRoomContent({ componentName, content }: RenderPressRoomContentProps) {
  switch (componentName) {
    case "components.rich-text":
      return (
        <div className="prose prose-lg max-w-none text-text-primary [&>p]:mb-4 [&>h2]:text-h4 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-h5 [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&_a]:text-details [&_a]:underline [&_a]:transition-opacity [&_a]:duration-200 hover:[&_a]:opacity-70">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.richText || content.content || ''}
          </ReactMarkdown>
        </div>
      );
    case "components.video":
      return (
        <div className="my-4">
          <div className="aspect-video">
            {content.videoType === "youtube" && content.youtubeUrl && (
              <iframe
                className="w-full h-full rounded-lg"
                src={convertToEmbedUrl(content.youtubeUrl, "youtube")}
                title={content.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {content.videoType === "vimeo" && content.vimeoUrl && (
              <iframe
                className="w-full h-full rounded-lg"
                src={convertToEmbedUrl(content.vimeoUrl, "vimeo")}
                title={content.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {content.videoType === "uploaded" && content.uploadedVideo && (
              <video 
                className="w-full h-full rounded-lg"
                src={content.uploadedVideo?.url} 
                title={content.title || "Video"}
                controls
              />
            )}
          </div>
        </div>
      );
    case "components.intro":
      return <IntroPage introData={content} />;
    case "components.button":
      return (
        <Button variant="primary-blue" onClick={() => {
              if (content.link || content.url) {
                window.open(content.link || content.url, content.target || "_blank");
              }
            }}>
            {content.text || content.label || "BOTÓN DE PRUEBA"}
        </Button>
      );
    case "components.images-gallery":
      return (
        <div className="my-4">
          {content.title && (
            <h3 className="text-h4 mb-4">{content.title}</h3>
          )}
          
          {content.type === "grid" ? (
            // Grid Layout
            <>
              <style jsx>{`
                .images-gallery-grid {
                  display: grid;
                  grid-template-columns: repeat(${content.gridSettings?.columnsMobile || 1}, 1fr);
                  gap: ${content.gridSettings?.gap || 16}px;
                }
                @media (min-width: 768px) {
                  .images-gallery-grid {
                    grid-template-columns: repeat(${content.gridSettings?.columns || 3}, 1fr);
                  }
                }
              `}</style>
              <div className="images-gallery-grid">
                {content.item && Array.isArray(content.item) && content.item.map((item: any, index: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <div key={index} className="flex items-center justify-center">
                    <img 
                      src={item.logo?.url || ''} 
                      alt={item.name || "Image"} 
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Slider Layout
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={content.sliderSettings?.spaceBetween || 0}
                slidesPerView={content.sliderSettings?.slidesPerView || 1}
                loop={content.sliderSettings?.loop && content.item && content.item.length > (content.sliderSettings?.slidesPerView || 1)}
                autoplay={content.sliderSettings?.autoplay ? {
                  delay: content.sliderSettings?.autoplayDelay || 3000,
                  disableOnInteraction: false,
                } : false}
                speed={content.sliderSettings?.speed || 300}
                pagination={content.sliderSettings?.pagination && content.item && content.item.length > (content.sliderSettings?.slidesPerView || 1) ? { 
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3
                } : false}
                navigation={content.sliderSettings?.navigation && content.item && content.item.length > (content.sliderSettings?.slidesPerView || 1)}
                centeredSlides={content.sliderSettings?.centeredSlides || false}
                grabCursor={content.sliderSettings?.grabCursor || true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: Math.min(content.sliderSettings?.slidesPerView || 2, 2),
                    spaceBetween: content.sliderSettings?.spaceBetween || 20,
                  },
                  768: {
                    slidesPerView: content.sliderSettings?.slidesPerView || 3,
                    spaceBetween: content.sliderSettings?.spaceBetween || 30,
                  },
                }}
                className={content.item && content.item.length > (content.sliderSettings?.slidesPerView || 1) ? "swiper-custom" : "swiper-custom !p-0"}
              >
                {content.item && Array.isArray(content.item) && content.item.map((item: any, index: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center">
                      <img 
                        src={item.logo?.url || ''} 
                        alt={item.name || "Image"} 
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      );
    case "components.logo-item":
      return (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg my-4">
          <img 
            src={content.logo?.url || ''} 
            alt={content.name || "Logo"} 
            className="max-h-16 object-contain"
          />
          {content.name && <span className="ml-2 text-sm">{content.name}</span>}
        </div>
      );
    case "sections.intro":
      return <IntroPage introData={content} />;
    default:
      console.log("Unrecognized component:", componentName, content);
      return (
        <div className="my-8 border-2 border-yellow-500 p-4 bg-yellow-100">
          <p className="text-red-600 font-bold">
            Componente no reconocido: {componentName}
          </p>
          <pre className="text-xs mt-2">{JSON.stringify(content, null, 2)}</pre>
        </div>
      );
  }
}
