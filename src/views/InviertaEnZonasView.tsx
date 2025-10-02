"use client";

import HeadingPage from "@/components/HeadingPage";
// import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import ExampleImage from "@/assets/img/Frame 51.png";
import TitleDecorative from "@/utils/TitleDecorative";
import IconIberoamerica from "@/assets/img/icon-home-servicios 1.svg";
import Counter from "@/utils/Counter";
import type { TradeZonesPageType } from "@/types/componentsType";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface InviertaEnZonasViewProps {
  pageContent: TradeZonesPageType | null;
}

export default function InviertaEnZonasView({ pageContent }: InviertaEnZonasViewProps) {
  // Fallback si no hay datos
  if (!pageContent) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div>
      <HeadingPage
        title={pageContent.headingSection.title || ""}
        image={pageContent.headingSection.backgroundImg.url}
        textAlign="left"
        className="min-h-[500px] bg-top-right [&>div>h1]:text-center [&>div>p]:text-center [&>div>p]:lg:text-left [&>div>h1]:lg:text-left"
      />

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pr-24">
              <h2 className="text-h2 mb-10">{pageContent.about.title}</h2>
              <div className="text-[18px] leading-[31px] [&_ul]:list-disc [&_ul]:list-inside [&_ul]:pl-4 [&_ul]:space-y-2 [&_p]:mb-4">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{pageContent.about.description}</ReactMarkdown>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={pageContent.about.coverImage.url} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D5E3EA] py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary">
          <div className="w-full lg:w-1/3">
            <TitleDecorative
              dividerColor="bg-[#94D133]"
              className="text-left items-start"
            >
              {pageContent.statistics.title}
            </TitleDecorative>
          </div>
          <div className="w-full lg:w-1/3 space-y-10 mt-14 lg:mt-0">
            {pageContent.statistics.statistics?.slice(0, 2).map((statistic, index) => (
              <div key={statistic.id || index} className="flex items-center gap-6">
                <img
                  src={IconIberoamerica.src}
                  alt={statistic.label || "Icon Iberoamérica"}
                  className="w-16 h-16"
                />
                <Counter
                  value={parseInt(statistic.value || "0")}
                  prefix={statistic.prefix || "+"}
                  leyend={statistic.label || ""}
                  thousandSeparator={statistic.thousandsSeparator || "."}
                />
              </div>
            ))}
            {/* Fallback si no hay datos */}
            {(!pageContent.statistics.statistics || pageContent.statistics.statistics.length === 0) && (
              <>
                <div className="flex items-center gap-6">
                  <img
                    src={IconIberoamerica.src}
                    alt="Icon Iberoamérica"
                    className="w-16 h-16"
                  />
                  <Counter
                    value={800}
                    prefix="+"
                    leyend="Zonas Francas"
                    thousandSeparator="."
                  />
                </div>

                <div className="flex items-center gap-6">
                  <img
                    src={IconIberoamerica.src}
                    alt="Icon Iberoamérica"
                    className="w-16 h-16"
                  />
                  <Counter
                value={8000}
                prefix="+"
                leyend="Empresas"
                thousandSeparator="."
              />
                </div>
              </>
            )}
          </div>
          <div className="w-full lg:w-1/3 space-y-10">
            {pageContent.statistics.statistics?.slice(2).map((statistic, index) => (
              <div key={statistic.id || index} className={`flex items-center gap-6 ${index === 0 ? 'mt-8 lg:mt-0' : ''}`}>
                <img
                  src={IconIberoamerica.src}
                  alt={statistic.label || "Icon Iberoamérica"}
                  className="w-16 h-16"
                />
                <Counter
                  value={parseInt(statistic.value || "0")}
                  prefix={statistic.prefix || "+"}
                  leyend={statistic.label || ""}
                  thousandSeparator={statistic.thousandsSeparator || "."}
                />
              </div>
            ))}
            {/* Fallback si no hay datos */}
            {(!pageContent.statistics.statistics || pageContent.statistics.statistics.length === 0) && (
              <>
                <div className="flex items-center gap-6 mt-8 lg:mt-0">
                  <img
                    src={IconIberoamerica.src}
                    alt="Icon Iberoamérica"
                    className="w-16 h-16"
                  />
                  <Counter
                    value={1090000}
                    prefix="+"
                    leyend="Empleos"
                    thousandSeparator="."
                  />
                </div>

                <div className="flex items-center gap-6">
                  <img
                    src={IconIberoamerica.src}
                    alt="Icon Iberoamérica"
                    className="w-16 h-16"
                  />
                  <Counter
                    value={65800}
                    prefix="USD $"
                    leyend="millones EXPORTACIÓN"
                    thousandSeparator="."
                  />
                </div>

                <div className="flex items-center gap-6">
                  <img
                    src={IconIberoamerica.src}
                    alt="Icon Iberoamérica"
                    className="w-16 h-16"
                  />
                  <Counter
                    value={48000}
                    prefix="USD $"
                    leyend="millones INVERSIONES"
                    thousandSeparator="."
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pl-24">
               <h2 className="text-h2 mb-10">{pageContent.about2.title}</h2>
               <div className="text-[18px] leading-[31px] [&_ul]:list-disc [&_ul]:list-inside [&_ul]:pl-4 [&_ul]:space-y-0 [&_p]:mb-4">
                 <ReactMarkdown rehypePlugins={[rehypeRaw]}>{pageContent.about2.description}</ReactMarkdown>
               </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={ExampleImage.src} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary lg:bg-linear-to-r from-secondary to-white from-70% to-20% py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 text-white items-center py-5 lg:py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pr-24">
               <h2 className="text-h2 mb-10">{pageContent.benefits.title}</h2>
               <div className="text-[18px] leading-[31px] [&_ul]:list-disc [&_ul]:list-inside [&_ul]:pl-4 [&_ul]:space-y-0 [&_p]:mb-4">
                 <ReactMarkdown rehypePlugins={[rehypeRaw]}>{pageContent.benefits.description}</ReactMarkdown>
               </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={pageContent.benefits.coverImage.url} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
