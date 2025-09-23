"use client"

import HeadingPage from "@/components/HeadingPage"
import CoverImage from "@/assets/img/bg-sala-prensa.jpg"
import IntroPage from "@/components/IntroPage"
import IconServicios from "@/assets/img/icon-home-servicios 1.svg"
import ExampleImage from "@/assets/img/Frame 51.png"
import Button from "@/utils/Button"

export default function ServiciosView() {
  const introData = {
    icon: {
      url: IconServicios.src,
      alternativeText: "Icono de información",
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in lobortis orci. Nullam laoreet, dolor quis mollis malesuada, nibh dui suscipit diam.",
  }

  return (
    <div>
        <HeadingPage
            title="Servicios"
            image={CoverImage.src}
            textAlign="left"
            className="min-h-[500px] bg-top-right [&>div>h1]:text-center [&>div>p]:text-center [&>div>p]:lg:text-left [&>div>h1]:lg:text-left"
        />

        <section className="bg-white py-10 lg:pt-16">
            <div className="container mx-auto px-4">
                <IntroPage introData={introData} />
            </div>
        </section>

        <section className="bg-white py-10 lg:pt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
                    <div className="w-full lg:w-1/2 lg:pr-24">
                        <h2 className="text-h2 mb-10">Posicionamiento</h2>
                        <p className="text-body2 leading-8">Posicionamos a las zonas francas como motores clave del desarrollo económico, la atracción de inversiones y la innovación en la región. Lo hacemos a través de nuestras plataformas y canales de comunicación, visibilizando sus logros, buenas prácticas, certificaciones y reconocimientos. De esta manera, fortalecemos su imagen ante inversionistas, organismos internacionales y actores estratégicos del sector.</p>
                        <Button 
                            icon={true}
                            onClick={() => {}}
                            className="mt-5 justify-between text-left"
                            > 
                            Conozca todas nuestras publicaciones
                        </Button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full" src={ExampleImage.src} alt="Servicios" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row-reverse gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
                    <div className="w-full lg:w-1/2 lg:pl-24">
                        <h2 className="text-h2 mb-10">Posicionamiento</h2>
                        <p className="text-body2 leading-8">Posicionamos a las zonas francas como motores clave del desarrollo económico, la atracción de inversiones y la innovación en la región. Lo hacemos a través de nuestras plataformas y canales de comunicación, visibilizando sus logros, buenas prácticas, certificaciones y reconocimientos. De esta manera, fortalecemos su imagen ante inversionistas, organismos internacionales y actores estratégicos del sector.</p>
                        <Button 
                            icon={true}
                            onClick={() => {}}
                            className="mt-5 justify-between text-left"
                            > 
                            Conozca todas nuestras publicaciones
                        </Button>
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
                        <h2 className="text-h2 mb-10">Información especializada del sector</h2>
                        <p className="text-body2 leading-8">Posicionamos a las zonas francas como motores clave del desarrollo económico, la atracción de inversiones y la innovación en la región. Lo hacemos a través de nuestras plataformas y canales de comunicación, visibilizando sus logros, buenas prácticas, certificaciones y reconocimientos. De esta manera, fortalecemos su imagen ante inversionistas, organismos internacionales y actores estratégicos del sector.</p>
                        <Button 
                            icon={true}
                            variant="secondary"
                            onClick={() => {}}
                            className="mt-5 bg-transparent justify-between text-left"
                            > 
                            Conozca todas nuestras publicaciones
                        </Button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full" src={ExampleImage.src} alt="Servicios" />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-white py-10 lg:pt-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row-reverse gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
                    <div className="w-full lg:w-1/2 lg:pl-24">
                        <h2 className="text-h2 mb-10">Negocios</h2>
                        <p className="text-body2 leading-8">Posicionamos a las zonas francas como motores clave del desarrollo económico, la atracción de inversiones y la innovación en la región. Lo hacemos a través de nuestras plataformas y canales de comunicación, visibilizando sus logros, buenas prácticas, certificaciones y reconocimientos. De esta manera, fortalecemos su imagen ante inversionistas, organismos internacionales y actores estratégicos del sector.</p>
                        <Button 
                            icon={true}
                            onClick={() => {}}
                            className="mt-5 justify-between text-left"
                            > 
                            Conozca todas nuestras publicaciones
                        </Button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full" src={ExampleImage.src} alt="Servicios" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
                    <div className="w-full lg:w-1/2 lg:pr-24">
                        <h2 className="text-h2 mb-10">Promoción</h2>
                        <p className="text-body2 leading-8">Posicionamos a las zonas francas como motores clave del desarrollo económico, la atracción de inversiones y la innovación en la región. Lo hacemos a través de nuestras plataformas y canales de comunicación, visibilizando sus logros, buenas prácticas, certificaciones y reconocimientos. De esta manera, fortalecemos su imagen ante inversionistas, organismos internacionales y actores estratégicos del sector.</p>
                        <Button 
                            icon={true}
                            onClick={() => {}}
                            className="mt-5 justify-between text-left"
                            > 
                            Conozca todas nuestras publicaciones
                        </Button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full" src={ExampleImage.src} alt="Servicios" />
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
