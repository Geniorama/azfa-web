"use client";

import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import CardNewsletter from "@/components/CardNewsletter";
import Pagination from "@/components/Pagination";
import ImageBanner from "@/assets/img/Frame 53.png";
import Button from "@/utils/Button";
import { NewsType, NewsCategoryType, NewsletterSectionType } from "@/types/componentsType";
import { truncateText } from "@/utils/truncateText";

// Interfaz extendida para newsletters con downloadDocument
interface NewsletterType extends NewsType {
  downloadDocument?: {
    url: string;
    alternativeText?: string;
  };
}

interface NewsletterViewProps {
  newsletterData: NewsletterType[];
  categoriesData: NewsCategoryType[];
  paginationMeta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } | null;
  newsletterSectionData: NewsletterSectionType | null;
}

export default function NewsletterView({ newsletterData, categoriesData, paginationMeta, newsletterSectionData }: NewsletterViewProps) {
  // Función para formatear la fecha como "JUN 25"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  console.log("categoriesData", categoriesData);

  // Función para formatear las newsletters para el componente
  const formatNewsletterData = (newsletters: NewsletterType[]) => {
    return newsletters.map((item) => ({
      title: item.title,
      date: formatDate(item.publishedAt),
      description: truncateText(item.extract, 100),
      url: item.downloadDocument?.url || item.externalLink || "#",
      hasDocument: !item.externalLink && !!item.downloadDocument?.url,
    }));
  };

  // Colores de fondo para las tarjetas
  const backgroundColors = [
    "bg-details", "bg-secondary", "bg-primary", 
    "bg-background-1", "bg-background-2", "bg-background-3"
  ];

  const handleOpenNewsletter = (url: string) => {
    window.open(url, "_blank");
  };

  const formattedNewsletterData = formatNewsletterData(newsletterData);

  return (
    <div>
        <HeadingPageSalaPrensa
            title={newsletterSectionData?.title || "Newsletter"}
            description={newsletterSectionData?.description || "Revise boletines informativos con actualizaciones exclusivas, iniciativas y oportunidades de interés en sólo 3 minutos"}
            image={newsletterSectionData?.backgroundImg?.url || CoverImage.src}
            slug="newsletter"
            textAlign={newsletterSectionData?.alignment || "center"}
        />

        <section className="bg-white lg:py-16 py-10">
            <div className="container mx-auto px-4">
                {formattedNewsletterData.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formattedNewsletterData.map((item, index) => (
                            <CardNewsletter 
                              key={index}
                              title={item.title} 
                              date={item.date} 
                              button={{ 
                                label: "Leer boletín", 
                                onClick: () => handleOpenNewsletter(item.url) 
                              }} 
                              background={backgroundColors[index % backgroundColors.length]} 
                            />
                        ))}
                    </div>
                    {paginationMeta && paginationMeta.pagination && paginationMeta.pagination.pageCount > 1 && (
                      <div className="flex justify-center mt-16">
                        <Pagination 
                          currentPage={paginationMeta.pagination.page} 
                          totalPages={paginationMeta.pagination.pageCount} 
                          onPageChange={() => {}} 
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-text-primary text-lg">
                      No se encontraron newsletters disponibles.
                    </p>
                  </div>
                )}
            </div>
        </section>

        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                {/* Bg gradient */}
                <div className="flex flex-col lg:flex-row lg:gap-12 gap-5 items-center p-8 lg:p-12 mt-10 lg:mt-0 bg-secondary lg:bg-linear-to-r from-white to-secondary from-20% to-20%">
                    <div className="w-full lg:w-1/2">
                        <img src={ImageBanner.src} alt="Banner" className="w-full h-full object-cover -mt-22 lg:mt-0" />
                    </div>
                    <div className="w-full lg:w-1/2 lg:pr-12">
                        <h4 className="lg:text-[40px] text-h3 leading-12">Sea el primero en recibir nuestro Boletín AZFA</h4>
                        <p className="lg:text-h5 text-h6 mt-3">Manténgase informado con las últimas noticias, eventos y publicaciones del ecosistema de Zonas Francas.</p>

                        <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 mt-5">
                            <input placeholder="Ingrese su correo electrónico" className="bg-white flex-grow text-text-primary px-5 outline-none focus:outline-none h-12 lg:h-auto rounded-sm" type="text" />
                            <Button
                                onClick={() => {}}
                                variant="primary"
                                icon
                                className="justify-between"
                            >
                                Suscribirse
                            </Button>
                        </div>

                        <p className="text-caption mt-5">Al suscribirse, acepta nuestra política de privacidad y su tratamiento de datos *</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
