"use client";

import HeadingPage from "@/components/HeadingPage";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import { InmuebleType } from "@/types/inmuebleType";
import SliderGallery from "@/components/SliderGallery";
// import icons
import IconArea from "@/assets/img/icon-area.svg";
import IconEstado from "@/assets/img/icon-nuevo-usado.svg";
import IconUso from "@/assets/img/icon-uso.svg";
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg";
import IconTipoOferta from "@/assets/img/icon-oferta.svg";
import ImgGallery1 from "@/assets/img/2148975280.jpg";
import ImgGallery2 from "@/assets/img/2148975282.jpg";
import IconCertificado from "@/assets/img/icon-certificacion.svg";
import Button from "@/utils/Button";

// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"

export default function OfertaInmobiliariaSingle() {
  //   const [inmueble, setInmueble] = useState<InmuebleType | null>(null)
  //   const { slug } = useParams()

  const exampleInmueble: InmuebleType = {
    id: "1",
    title: "Casa en venta",
    image: "https://via.placeholder.com/600x400",
    offerType: "Venta",
    propertyType: "Casa",
    propertyUse: "Terreno",
    city: "San José",
    country: "Costa Rica",
    status: "Nuevo",
    area: "3.000m2",
    slug: "casa-en-venta",
    gallery: [ImgGallery1.src, ImgGallery2.src],
    platinum: true,
    description:
      "El Parque Industrial Villanueva es uno de los líderes en el desarrollo de Zona Franca en Centroamérica. Cada uno de nuestros edificios tiene un potencial de expansión de hasta 10,000 ó 23,000 metros cuadrados, también ofrecemos lotes de 5,000 metros cuadrados o mas. 'Built to Suit', 'Turn-Key projects' y financiamiento disponible. Generamos mas de 12,000 empleos directos con exportaciones a los Estados Unidos, Canadá, Europa, Japón y Australia. Área total construida del parque 300,000 mts2.",
    certificates: [
      {
        id: "1",
        name: "Empresa Socialmente Responsable",
      },
      {
        id: "2",
        name: "Certificado de propiedad",
      },
    ],
  };

  //   useEffect(() => {
  //     const fetchInmueble = async () => {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/inmuebles/${slug}`)
  //       const data = await response.json()
  //       setInmueble(data)
  //     }
  //     fetchInmueble()
  //   }, [slug])

  //   if (!inmueble) return <div>Loading...</div>

  return (
    <div className="pb-16">
      <HeadingPage
        title="Oferta Inmobiliaria"
        smallTitle="Encuentre aquí el inmueble que necesita"
        className="relative pb-32"
      />
      <section className="-mt-16 z-1 relative">
        <div className="container mx-auto px-4">
          <AdvancedSearchBar />
        </div>
      </section>
      <article className="pb-0 pt-12 lg:pb-12 lg:pt-24 text-text-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row lg:gap-4 items-center">
            {/* Left side */}
            <div className="w-full md:w-1/2 relative">
              {exampleInmueble.gallery && (
                <div className="relative top-0 lg:-right-12 w-full h-full">
                  <SliderGallery images={exampleInmueble.gallery} isPlatinum={exampleInmueble.platinum} />
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white p-4 md:py-16 md:px-22">
              <h1 className="text-h3 font-light">{exampleInmueble.title}</h1>
              <span className="h-0.5 w-10 bg-details block mb-4"></span>
              <h5 className="text-h6">
                {exampleInmueble.city} / {exampleInmueble.country}
              </h5>
              {/* Features */}
              <div className="flex flex-row space-y-3 mt-10 flex-wrap">
                <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                  <img
                    src={IconTipoOferta.src}
                    alt="Tipo de oferta"
                    className="w-4 h-4"
                  />
                  <span className="text-body2">
                    {exampleInmueble.offerType}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                  <img
                    src={IconTipoInmueble.src}
                    alt="Tipo de inmueble"
                    className="w-4 h-4"
                  />
                  <span className="text-body2">
                    {exampleInmueble.propertyType}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                  <img
                    src={IconUso.src}
                    alt="Uso de inmueble"
                    className="w-4 h-4"
                  />
                  <span className="text-body2">
                    {exampleInmueble.propertyUse}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                  <img
                    src={IconArea.src}
                    alt="Área de inmueble"
                    className="w-4 h-4"
                  />
                  <span className="text-body2">{exampleInmueble.area}</span>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                  <img
                    src={IconEstado.src}
                    alt="Estado de inmueble"
                    className="w-4 h-4"
                  />
                  <span className="text-body2">{exampleInmueble.status}</span>
                </div>
              </div>
              <p className="text-body font-light mt-4">
                {exampleInmueble.description}
              </p>

              {/* Certificates */}
              {exampleInmueble.certificates && (
                <div className="mt-10">
                  <div className="flex items-center gap-2">
                    <img
                      src={IconCertificado.src}
                      alt="Certificado"
                      className="w-4 h-4"
                    />
                    <h3 className="text-body font-medium">Certificaciones</h3>
                  </div>
                  <ul className="mt-2 list-disc list-inside pl-5 text-body font-light space-y-1">
                    {exampleInmueble.certificates.map((certificate) => (
                      <li key={certificate.id}>
                        <span className="text-body2">{certificate.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact */}
              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <Button className="justify-between lg:justify-start" onClick={() => {}} variant="outline-primary" icon>
                  Ver incentivos del país
                </Button>
                <Button className="justify-between lg:justify-start" onClick={() => {}} variant="primary" icon>
                  Solicitar información
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
