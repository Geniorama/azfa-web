"use client";

import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import CardNewsletter from "@/components/CardNewsletter";
import Pagination from "@/components/Pagination";

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
    </div>
  )
}
