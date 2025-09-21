"use client";

import HeadingPage from "@/components/HeadingPage";
import JuntaDirectivaImage from "@/assets/img/bg-quienes-somos.jpg";
import IntroPage from "@/components/IntroPage";
import { IntroData } from "@/types/componentsType";
import IconIntroQuienesSomos from "@/assets/img/icon-home-quienes-somos-voz-lider 1.svg";
import IconTabs from "@/assets/img/icon-home-iberoamerica-empleos 2.svg";
import CardTeamMember from "@/components/CardTeamMember";
import memberTeam from "@/assets/img/member-team.jpg";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ImageComision from "@/assets/img/img comisiones.png";
import IconPerson from "@/assets/img/person-1.svg";
import LeaderPerson from "@/assets/img/leader.png";
import AvatarPerson from "@/components/AvatarPerson";

export default function JuntaDirectivaView() {
  const [activeTab, setActiveTab] = useState("junta-directiva");
  const pathname = usePathname();
  const router = useRouter();

  // Detectar el tab activo basado en la URL solo en la carga inicial
  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    // Mapear slugs a tabs
    const slugToTab: { [key: string]: string } = {
      'junta-directiva': 'junta-directiva',
      'comisiones': 'comisiones',
      'equipo-azfa': 'equipo-azfa'
    };
    
    if (slugToTab[lastSegment]) {
      setActiveTab(slugToTab[lastSegment]);
    } else if (pathname === '/quienes-somos') {
      // Si está en la página principal, redirigir al tab junta-directiva
      router.replace('/quienes-somos/junta-directiva');
    }
  }, []); // Solo ejecutar en el montaje inicial

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Actualizar la URL usando pushState para evitar recarga
    window.history.pushState(null, '', `/quienes-somos/${tab}`);
  };

  const introData: IntroData = {
    icon: {
      url: IconIntroQuienesSomos.src,
      alternativeText: "Junta Directiva",
    },
    content:
      "En la Asociación de Zonas Francas de las Américas (AZFA), <span className='text-details'>somos la voz líder</span> del sector en Iberoamérica. Con 27 años de trayectoria, impulsamos el crecimiento y la competitividad de las Zonas Francas, promoviendo la inversión, la innovación y el desarrollo sostenible en la región.",
  };

  const members = [
    {
      image: memberTeam.src,
      name: "John Doe",
      position: "CEO",
      company: "Company",
      location: "Location",
      email: "john.doe@example.com",
    },

    {
      image: memberTeam.src,
      name: "John Doe",
      position: "CEO",
      company: "Company",
      location: "Location", 
      email: "john.doe@example.com",
    },

    {
      image: memberTeam.src,
      name: "John Doe",
      position: "CEO",
      company: "Company",
      location: "Location",
      email: "john.doe@example.com",
    },

    {
      image: memberTeam.src,
      name: "John Doe",
      position: "CEO",
      company: "Company",
      location: "Location",
      email: "john.doe@example.com",
    },
  ];

  return (
    <div>
      <HeadingPage
        title="Quiénes Somos"
        textAlign="center"
        image={JuntaDirectivaImage.src}
        className="min-h-[500px] lg:text-left"
      />

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <IntroPage introData={introData} />
        </div>
      </section>

      {/* Section Tabs */}
      <section className="bg-white lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 justify-center items-start text-center">
            <div
              className={`w-1/3 max-w-[350px] border-b-2  hover:border-details lg:pb-14 pb-6 transition cursor-pointer ${
                activeTab === "junta-directiva"
                  ? "border-details"
                  : "border-white"
              }`}
              onClick={() => handleTabClick("junta-directiva")}
            >
              <img
                src={IconTabs.src}
                alt="Icon Tabs"
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                Junta Directiva
              </h2>
            </div>
            <div
              className={`w-1/3 max-w-[350px] border-b-2  hover:border-details lg:pb-14 pb-6 transition cursor-pointer ${
                activeTab === "comisiones" ? "border-details" : "border-white"
              }`}
              onClick={() => handleTabClick("comisiones")}
            >
              <img
                src={IconTabs.src}
                alt="Icon Tabs"
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                Comisiones
              </h2>
            </div>
            <div
              className={`w-1/3 max-w-[350px] border-b-2  hover:border-details lg:pb-14 pb-6 transition cursor-pointer ${
                activeTab === "equipo-azfa" ? "border-details" : "border-white"
              }`}
              onClick={() => handleTabClick("equipo-azfa")}
            >
              <img
                src={IconTabs.src}
                alt="Icon Tabs"
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                Equipo AZFA
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Section Content */}
      <section className="bg-background-1 py-10 lg:py-28">
        <div className="container mx-auto px-4">
          {/* Tab Junta Directiva */}
          {activeTab === "junta-directiva" && (
            <div>
              <div className="text-center">
                <h2 className="text-h2 font-normal text-text-primary">
                  Mesa Directiva
                </h2>
                <span className="w-12 block mx-auto h-[2px] bg-details my-2"></span>
              </div>

              {/* Grid Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                {members.map((member, index) => (
                  <CardTeamMember
                    key={index}
                    image={member.image}
                    name={member.name}
                    position={member.position}
                    company={member.company}
                    location={member.location}
                  />
                ))}
              </div>

              <div className="text-center mt-16">
                <h2 className="text-h2 font-normal text-text-primary">
                  Presidentes Honorarios
                </h2>
                <span className="w-12 block mx-auto h-[2px] bg-details my-2"></span>
              </div>

              {/* Grid Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                {members.map((member, index) => (
                  <CardTeamMember
                    key={index}
                    image={member.image}
                    name={member.name}
                    position={member.position}
                    company={member.company}
                    location={member.location}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tab Comisiones */}
          {activeTab === "comisiones" && (
            <div>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 lg:pr-32 pt-6 text-text-primary">
                  <h2 className="text-h2 font-normal text-text-primary mb-8">
                    Comisión de Posicionamiento
                  </h2>
                  <p>
                    Enfocada en potenciar la visibilidad de las zonas francas
                    como ecosistemas de competitividad e innovación, elevando su
                    presencia en mercados estratégicos y fortaleciendo su
                    reconocimiento regional a través de estrategias efectivas de
                    comunicación y marketing.
                  </p>
                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Líder de la Comisión</p>
                      <p>John Doe - Zona Franca Lima</p>
                      <AvatarPerson
                        image={LeaderPerson.src}
                        alternativeText="Leader Person"
                        name="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Equipo:</p>
                      <div className="flex flex-row gap-4">
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    className="w-full h-full object-cover"
                    src={ImageComision.src}
                    alt="Image Comision"
                  />
                </div>
              </div>

              <hr className="my-16 border-slate-300" />

              <div className="flex flex-col lg:flex-row-reverse gap-6">
                <div className="w-full lg:w-1/2 text-text-primary pt-6 lg:pl-32">
                  <h2 className="text-h2 font-normal text-text-primary mb-8">
                    Comisión legal
                  </h2>
                  <p>
                    Enfocada en potenciar la visibilidad de las zonas francas
                    como ecosistemas de competitividad e innovación, elevando su
                    presencia en mercados estratégicos y fortaleciendo su
                    reconocimiento regional a través de estrategias efectivas de
                    comunicación y marketing.
                  </p>
                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Líder de la Comisión</p>
                      <p>John Doe - Zona Franca Lima</p>
                      <AvatarPerson
                        image={LeaderPerson.src}
                        alternativeText="Leader Person"
                        name="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Equipo:</p>
                      <div className="flex flex-row gap-4">
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    src={ImageComision.src}
                    alt="Image Comision"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <hr className="my-16 border-slate-300" />

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 lg:pr-32 pt-6 text-text-primary">
                  <h2 className="text-h2 font-normal text-text-primary mb-8">
                    Comisión de Captación de Inversiones
                  </h2>
                  <p>
                    Enfocada en potenciar la visibilidad de las zonas francas
                    como ecosistemas de competitividad e innovación, elevando su
                    presencia en mercados estratégicos y fortaleciendo su
                    reconocimiento regional a través de estrategias efectivas de
                    comunicación y marketing.
                  </p>
                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Líder de la Comisión</p>
                      <p>John Doe - Zona Franca Lima</p>
                      <AvatarPerson
                        image={LeaderPerson.src}
                        alternativeText="Leader Person"
                        name="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Equipo:</p>
                      <div className="flex flex-row gap-4">
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    className="w-full h-full object-cover"
                    src={ImageComision.src}
                    alt="Image Comision"
                  />
                </div>
              </div>

              <hr className="my-16 border-slate-300" />

              <div className="flex flex-col lg:flex-row-reverse gap-6">
                <div className="w-full lg:w-1/2 text-text-primary pt-6 lg:pl-32">
                  <h2 className="text-h2 font-normal text-text-primary mb-8">
                    Comisión de Sostenibilidad
                  </h2>
                  <p>
                    Enfocada en potenciar la visibilidad de las zonas francas
                    como ecosistemas de competitividad e innovación, elevando su
                    presencia en mercados estratégicos y fortaleciendo su
                    reconocimiento regional a través de estrategias efectivas de
                    comunicación y marketing.
                  </p>
                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Líder de la Comisión</p>
                      <p>John Doe - Zona Franca Lima</p>
                      <AvatarPerson
                        image={LeaderPerson.src}
                        alternativeText="Leader Person"
                        name="John Doe"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 items-start mt-5">
                    <img src={IconPerson.src} alt="Icon Person" />
                    <div>
                      <p>Equipo:</p>
                      <div className="flex flex-row gap-4">
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                        <AvatarPerson
                          image={LeaderPerson.src}
                          alternativeText="Leader Person"
                          name="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    src={ImageComision.src}
                    alt="Image Comision"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Equipo AZFA */}
          {activeTab === "equipo-azfa" && (
            <div>
              {/* Grid Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {members.map((member, index) => (
                  <CardTeamMember
                    key={index}
                    image={member.image}
                    name={member.name}
                    position={member.position}
                    company={member.company}
                    location={member.location}
                    email={member.email}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
