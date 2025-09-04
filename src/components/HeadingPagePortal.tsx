"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeadingPageProps {
  title?: string;
  smallTitle?: string;
  image?: string;
  textAlign?: "left" | "center" | "right";
  className?: string;
}

export default function HeadingPagePortal({
  title,
  smallTitle,
  image,
  textAlign = "center",
  className,
}: HeadingPageProps) {
  const [selectedTab, setSelectedTab] = useState("estudios-azfa");
  const router = useRouter();

  const handleClickTab = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/portal-afiliados/${tab}`);
    
  };

  return (
    <div
      style={{ backgroundImage: `url(${image || ""})` }}
      className={`bg-primary bg-cover bg-center bg-no-repeat py-16 px-6 lg:px-12 relative flex flex-col items-center justify-center ${
        textAlign === "left"
          ? "text-left"
          : textAlign === "center"
          ? "text-center"
          : "text-right"
      } ${className}`}
    >
      <h1 className="text-background-1 text-h3 lg:text-6xl font-normal">
        {title}
      </h1>
      <p className="text-white text-h6 lg:text-lg mt-4">{smallTitle}</p>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg mt-8 gap-0.5 md:gap-0">
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-12 w-full md:w-1/3 lg:rounded-tl-lg lg:rounded-bl-lg  border-background-3 cursor-pointer ${
            selectedTab === "estudios-azfa" ? "bg-[#94D133] " : "bg-white border-r"
          }`}
          onClick={() => handleClickTab("estudios-azfa")}
        >
          Estudios AZFA
        </button>
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-12 w-full md:w-1/3 cursor-pointer ${
            selectedTab === "gestion-azfa" ? "bg-[#94D133] " : "bg-white"
          }`}
          onClick={() => handleClickTab("gestion-azfa")}
        >
          Gestión AZFA
        </button>
        <button
          className={`text-text-primary text-body1 lg:text-h6 lg:text-lg p-3 px-12 w-full md:w-1/3 lg:rounded-tr-lg lg:rounded-br-lg  border-background-3 cursor-pointer ${
            selectedTab === "estadisticas-afiliados"
              ? "bg-[#94D133] "
              : "bg-white border-l"
          }`}
          onClick={() => handleClickTab("estadisticas-afiliados")}
        >
          Estadísticas para Afiliados
        </button>
      </div>
    </div>
  );
}
