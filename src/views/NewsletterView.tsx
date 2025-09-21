"use client";

import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import CardNewsletter from "@/components/CardNewsletter";
import Pagination from "@/components/Pagination";
import ImageBanner from "@/assets/img/Frame 53.png";
import Button from "@/utils/Button";

export default function NewsletterView() {
  return (
    <div>
        <HeadingPageSalaPrensa
            title="Newsletter"
            description="Revise boletines informativos con actualizaciones exclusivas, iniciativas y oportunidades de interés en sólo 3 minutos"
            image={CoverImage.src}
            slug="newsletter"
        />

        <section className="bg-white lg:py-16 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardNewsletter title="Newsletter 1" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-details"} />
                    <CardNewsletter title="Newsletter 2" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-secondary"} />
                    <CardNewsletter title="Newsletter 3" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-primary"} />
                    <CardNewsletter title="Newsletter 4" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-background-1"} />
                    <CardNewsletter title="Newsletter 5" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-background-2"} />
                    <CardNewsletter title="Newsletter 6" date="2025-01-01" button={{ label: "Ver más", onClick: () => {} }} background={"bg-background-3"} />
                </div>
                <div className="flex justify-center mt-16">
                    <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
                </div>
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
