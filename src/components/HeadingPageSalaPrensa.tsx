"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeadingPageSalaPrensaProps {
  title?: string;
  description?: string;
  image?: string;
  textAlign?: "left" | "center" | "right";
  className?: string;
  slug: string;
}

export default function HeadingPageSalaPrensa({
  title = "Sala de prensa",
  description = "Infórmese con los acontecimientos más recientes y relevantes del ecosistema de zonas francas en Iberoamérica",
  image,
  textAlign = "center",
  className,
  slug,
}: HeadingPageSalaPrensaProps) {
  const [selectedTab] = useState(slug);
  const router = useRouter();

  const handleClickTab = (tab: string) => {
    router.push(`/sala-de-prensa/${tab}`);
  };

  return (
    <div
      style={{ backgroundImage: `url(${image || ""})` }}
      className={`bg-primary bg-cover bg-right lg:bg-center bg-no-repeat py-16 px-6 lg:px-12 relative flex flex-col items-center justify-center ${
        textAlign === "left"
          ? "text-left"
          : textAlign === "center"
          ? "text-center"
          : "text-right"
      } ${className}`}
    >
      {/* Título */}
      <h1 className="text-white text-h3 lg:text-6xl font-normal mb-6">
        {title}
      </h1>
      
      {/* Descripción */}
      <div className="max-w-4xl mb-8">
        <p className="text-white text-body1 lg:text-lg">
          {description}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg gap-0.5 md:gap-0">
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-6 w-full md:w-1/4 lg:rounded-tl-lg lg:rounded-bl-lg cursor-pointer transition-colors border-r border-gray-300 ${
            selectedTab === "noticias" 
              ? "bg-details text-gray-800" 
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => handleClickTab("noticias")}
        >
          Noticias
        </button>
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-6 w-full md:w-1/4 cursor-pointer transition-colors border-r border-gray-300 ${
            selectedTab === "podcast" 
              ? "bg-details text-gray-800" 
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => handleClickTab("podcast")}
        >
          Podcast
        </button>
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-6 w-full md:w-1/4 cursor-pointer transition-colors border-r border-gray-300 ${
            selectedTab === "newsletter" 
              ? "bg-details text-gray-800" 
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => handleClickTab("newsletter")}
        >
          Newsletter
        </button>
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-6 w-full md:w-1/4 lg:rounded-tr-lg lg:rounded-br-lg cursor-pointer transition-colors ${
            selectedTab === "blog" 
              ? "bg-details text-gray-800" 
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => handleClickTab("blog")}
        >
          Blog
        </button>
      </div>
    </div>
  );
}
