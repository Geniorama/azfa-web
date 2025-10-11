"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeadingPagePortal from "@/components/HeadingPagePortal";
import { AffiliateInvestmentStatisticsType } from "@/types/contentType";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface AffiliateStatisticsViewProps {
  pageContent: AffiliateInvestmentStatisticsType | null;
}

// Función para extraer el src del iframe desde el HTML
const extractIframeSrc = (htmlContent: string): string => {
  const srcMatch = htmlContent.match(/src="([^"]*)"/);
  return srcMatch ? srcMatch[1] : '';
};

export default function AffiliateStatisticsView({ pageContent }: AffiliateStatisticsViewProps) {
  const router = useRouter();
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const { isAuthenticated, isEditor, isAdmin } = useAuth();

  // Verificar si el usuario tiene permisos para ver la sección CTA
  const canShowCTA = isAdmin || (isAuthenticated && isEditor);

  // Debug: Verificar permisos
  console.log("AffiliateStatisticsView - Auth Debug:", {
    isAuthenticated,
    isEditor,
    isAdmin,
    canShowCTA
  });

  const handleIframeLoad = (iframeId: number) => {
    setLoadedIframes(prev => new Set(prev).add(iframeId));
  };

  // Datos por defecto en caso de que no haya contenido
  const defaultData = {
    title: "Estadísticas para Afiliados",
    smallTitle: "Explore visualizaciones interactivas con datos comparativos y tendencias clave de las zonas francas en Iberoamérica",
    disclaimerText: "",
    heroBackground: {
      url: "/images/estadisticas-afiliados.jpg"
    },
    ctaSection: {
      title: "¿Necesita actualizar la información estadística de su país?",
      description: "Haga clic en el botón a continuación para acceder al formulario de edición. Recuerde ingresar con su usuario y contraseña asignados para continuar.",
      button: {
        label: "Editar información de mi país",
        url: "/dashboard"
      }
    },
    iframeCollection: {
      data: []
    }
  };

  const data = pageContent || defaultData;

  // Debug: Verificar que los datos estén llegando
  console.log("AffiliateStatisticsView - pageContent:", pageContent);
  console.log("AffiliateStatisticsView - iframeCollection:", data.iframeCollection);
  
  // La estructura real es un array directo, no un objeto con .data
  const iframeData = Array.isArray(data.iframeCollection) ? data.iframeCollection : data.iframeCollection?.data || [];
  console.log("AffiliateStatisticsView - iframeData length:", iframeData.length);
  
  // Debug detallado de cada iframe
  iframeData.forEach((iframeItem, index) => {
    console.log(`Iframe ${index}:`, iframeItem);
    console.log(`Iframe ${index} - desktopIframe:`, iframeItem.desktopIframe);
    console.log(`Iframe ${index} - mobileIframe:`, iframeItem.mobileIframe);
    if (iframeItem.desktopIframe?.bottomText) {
      console.log(`Iframe ${index} - desktopIframe content:`, iframeItem.desktopIframe.bottomText);
      console.log(`Iframe ${index} - extracted src:`, extractIframeSrc(iframeItem.desktopIframe.bottomText));
    }
  });

  return (
    <div>
      <HeadingPagePortal
        title={data.title}
        smallTitle={data.smallTitle}
        image={data.heroBackground?.url || "/images/estadisticas-afiliados.jpg"}
        slug="estadisticas-afiliados"
      />

      {/* Contenido de iframes */}
      {iframeData && iframeData.length > 0 ? (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <span className="text-button text-text-primary">
              Dashboard interactivo embebido (Power BI)
            </span>
            
            {/* Aviso para móviles */}
            <div className="md:hidden flex items-start gap-2 mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/device-monitor.svg" 
                alt="Icon Device Monitor" 
                className="w-6 h-6 mt-1"
              />
              <p className="text-caption font-light text-background-3">
                Este tablero está optimizado para pantallas de escritorio. Le recomendamos acceder desde un computador para visualizar correctamente los datos.
              </p>
            </div>

            {/* Renderizar iframes */}
            <div className="mt-12 space-y-8">
              {iframeData.map((iframeItem, index) => {
                const iframeId = index;
                const isLoaded = loadedIframes.has(iframeId);
                
                // Obtener el contenido del iframe (preferir desktop, fallback a mobile)
                // La estructura real usa bottomText en lugar de iframe
                const iframeContent = iframeItem.desktopIframe?.bottomText || iframeItem.mobileIframe?.bottomText || '';
                const iframeSrc = extractIframeSrc(iframeContent);
                
                return (
                  <div key={index} className="relative">
                    {/* Contenedor responsivo para el iframe */}
                    <div 
                      className="relative w-full bg-gray-100 rounded-lg overflow-hidden"
                      style={{ paddingBottom: '56.25%' }} // Aspect ratio 16:9
                    >
                      {/* Loading spinner */}
                      {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <LoadingSpinner />
                        </div>
                      )}
                      
                      {/* Iframe */}
                      {iframeSrc && (
                        <iframe
                          src={iframeSrc}
                          className="absolute inset-0 w-full h-full border-0"
                          loading="lazy"
                          onLoad={() => handleIframeLoad(iframeId)}
                          title={`Dashboard ${index + 1}`}
                        />
                      )}
                      
                      {/* Fallback si no hay src */}
                      {!iframeSrc && iframeContent && (
                        <div
                          className="absolute inset-0"
                          dangerouslySetInnerHTML={{ __html: iframeContent }}
                        />
                      )}
                    </div>

                      {/* Disclaimer */}
                      {pageContent?.disclaimerText && (
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">{pageContent?.disclaimerText}</p>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">
                No hay dashboards disponibles en este momento.
              </p>
              <p className="text-sm text-gray-500">
                Debug: iframeData length = {iframeData.length}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sección CTA - Solo visible para administradores y editores */}
      {data.ctaSection && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-[#94D133] p-12 mt-0">
              <div className="w-full md:w-3/5 text-text-primary space-y-2">
                <p className="text-h6">
                  {data.ctaSection.title}
                </p>
                <div className="text-body font-light [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-1 [&_a]:text-text-primary [&_a:hover]:text-details [&_a]:transition-colors">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      strong: ({children}) => <span className="font-bold">{children}</span>,
                      b: ({children}) => <span className="font-bold">{children}</span>,
                    }}
                  >
                    {data.ctaSection.description}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="w-full md:w-2/5">
                <button
                  onClick={() => {
                    if (data.ctaSection?.button?.url) {
                      router.push(data.ctaSection.button.url);
                    }
                  }}
                  className="w-full bg-[#94D133] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7fb32a] transition-colors duration-200 inline-flex justify-center items-center gap-2"
                >
                  {data.ctaSection.button?.label || "Acceder"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
