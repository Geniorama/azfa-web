"use client";
import HeadingPage from "@/components/HeadingPage";
import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import IconDeviceMonitor from "@/assets/img/device-monitor.svg";
import { InvestmentStatisticsType } from "@/types/contentType";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface InvestmentStatisticsViewProps {
  pageContent: InvestmentStatisticsType | null;
}

// Función para extraer la URL del iframe desde el HTML
const extractIframeSrc = (htmlString: string): string => {
  const srcMatch = htmlString.match(/src="([^"]+)"/);
  return srcMatch ? srcMatch[1] : '';
};

export default function InvestmentStatisticsView({ pageContent }: InvestmentStatisticsViewProps) {
  const router = useRouter();
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const [renderIframes, setRenderIframes] = useState(false);

  useEffect(() => {
    if (pageContent?.iframeCollection) {
      setRenderIframes(true);
    } else {
      setRenderIframes(false);
    }
  }, [pageContent]);

  const handleIframeLoad = (iframeId: number) => {
    setLoadedIframes(prev => new Set(prev).add(iframeId));
  };

  // Datos por defecto en caso de que no haya contenido
  const defaultData = {
    title: "Estadísticas",
    subtitle: "Conozca las estadísticas del sector de las Zonas Francas",
    disclaimerText: "",
    heroBackground: {
      url: "/images/estadisticas.jpg"
    },
    ctaSection: {
      title: "Usted está viendo una versión limitada del tablero.",
      description: "Para acceder al contenido completo, inicie sesión como afiliado. ¿Aún no es afiliado? Escríbanos y le guiaremos en el proceso de afiliación",
      button: {
        label: "Iniciar sesión",
        url: "/auth/login"
      }
    },
    iframeCollection: []
  };

  const data = pageContent || defaultData;

  return (
    <div>
      <HeadingPage
        title={data.subtitle || data.title}
        smallTitle={data.title !== data.subtitle ? data.title : "Conozca las estadísticas del sector de las Zonas Francas"}
        image={data.heroBackground?.url}
      />

      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-details p-6">
            <div className="w-full md:w-3/5 text-text-primary space-y-2">
              <p className="text-h6">
                {data.ctaSection?.title}
              </p>
              <div className="text-body font-light [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-1 [&_a]:text-text-primary [&_a:hover]:text-details [&_a]:transition-colors">
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    strong: ({children}) => <span className="font-bold">{children}</span>,
                    b: ({children}) => <span className="font-bold">{children}</span>,
                  }}
                >
                  {data.ctaSection?.description}
                </ReactMarkdown>
              </div>
            </div>
            <div className="w-full md:w-2/5 lg:text-right">
              <Button
                variant="primary"
                className="inline-flex justify-between h-auto"
                icon
                onClick={() => router.push(data.ctaSection?.button?.url || "/auth/login")}
              >
                {data.ctaSection?.button?.label || "Iniciar sesión"}
              </Button>
            </div>
          </div>

          {/* Tableros POWER BI */}
          {renderIframes && data.iframeCollection && data.iframeCollection.length > 0 ? (
            data.iframeCollection.map((iframeItem) => (
              <div key={iframeItem.id} className="my-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-button text-text-primary">{iframeItem.desktopIframe.title}</span>
                  <span className="text-sm text-text-secondary bg-gray-100 px-3 py-1 rounded-full">
                    {iframeItem.label}
                  </span>
                </div>
                
                <div className="md:hidden flex items-start gap-2 mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IconDeviceMonitor.src} alt="Icon Device Monitor" />
                  <p className="text-caption font-light text-background-3">
                    Este tablero está optimizado para pantallas de escritorio. Le recomendamos acceder desde un computador para visualizar correctamente los datos.
                  </p>
                </div>

                <div className="my-6">
                  {iframeItem.desktopIframe.bottomText ? (
                    <div className="w-full">
                      <div 
                        className="responsive-iframe-container relative w-full bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                        style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}
                      >
                        <iframe
                          className="absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-300"
                          src={iframeItem.desktopIframe.src || extractIframeSrc(iframeItem.desktopIframe.bottomText)}
                          title={iframeItem.desktopIframe.title}
                          allowFullScreen
                          loading="lazy"
                          style={{ minHeight: '400px' }}
                          onLoad={() => handleIframeLoad(iframeItem.id)}
                        />
                        {!loadedIframes.has(iframeItem.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                              <div className="text-sm text-gray-500">Cargando dashboard...</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Disclaimer */}
                      {pageContent?.disclaimerText && (
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">{pageContent?.disclaimerText}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
                      <p className="text-text-secondary">Dashboard no disponible</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="my-12">
              <span className="text-button text-text-primary">Dashboard interactivo embebido (Power BI)</span>
              <div className="md:hidden flex items-start gap-2 mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IconDeviceMonitor.src} alt="Icon Device Monitor" />
                <p className="text-caption font-light text-background-3">
                  Este tablero está optimizado para pantallas de escritorio. Le recomendamos acceder desde un computador para visualizar correctamente los datos.
                </p>
              </div>
              <div className="my-6">
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-100 flex items-center justify-center">
                  <p className="text-text-secondary">Dashboard no disponible</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
