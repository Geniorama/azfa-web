"use client";

import HeadingPage from "@/components/HeadingPage";
import JuntaDirectivaImage from "@/assets/img/bg-quienes-somos.jpg";
import IntroPage from "@/components/IntroPage";
import { HeadingType, IntroData } from "@/types/componentsType";
import IconTabs from "@/assets/img/icon-home-iberoamerica-empleos 2.svg";
import CardTeamMember, {
  CardTeamMemberProps,
} from "@/components/CardTeamMember";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import IconPerson from "@/assets/img/person-1.svg";
import AvatarPerson from "@/components/AvatarPerson";
import { getCountryName } from "@/utils/countryMapping";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface TeamMemberType {
  id: number;
  fullName: string;
  position: string;
  association: string;
  country: string;
  email?: string;
  memberType: string;
  subCategory: string;
  photo: {
    url: string;
    alternativeText?: string;
  };
  displayOrder?: number;
}

interface TabType {
  id: number;
  label: string;
  icon: {
    id: number;
    reactIconName: string;
    type: string;
    customImage?: {
      id: number;
      documentId: string;
      name: string;
      alternativeText?: string;
      caption?: string;
      url: string;
    };
  };
}

interface TabsSectionType {
  id: number;
  azfaTeamTab: TabType;
  committeesTab: TabType;
  boardOfDirectorsTab: TabType;
}

interface ProfileType {
  id: number;
  fullName: string;
  photo: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      medium?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface CommissionSectionType {
  id: number;
  title: string;
  description: string;
  leadersLabel: string;
  leadersText: string;
  teamLabel?: string;
  teamText?: string;
  teamProfiles: ProfileType[];
  leaderProfiles: ProfileType[];
  coverImage: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      medium?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      large?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface QuienesSomosViewProps {
  hero: HeadingType;
  intro?: IntroData;
  teamMembersData?: TeamMemberType[];
  tabsSection?: TabsSectionType;
  commissionSections?: CommissionSectionType[];
}

export default function JuntaDirectivaView({
  hero,
  intro,
  teamMembersData,
  tabsSection,
  commissionSections,
}: QuienesSomosViewProps) {
  const [activeTab, setActiveTab] = useState("junta-directiva");
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const tabsContentRef = useRef<HTMLDivElement>(null);

  // Función para filtrar miembros por tipo y ordenarlos según displayOrder o alfabéticamente
  const getMembersByType = (memberType: string, subCategory?: string) => {
    if (!teamMembersData) return [];

    const filtered = teamMembersData.filter((member) => {
      if (subCategory) {
        return (
          member.memberType === memberType && member.subCategory === subCategory
        );
      }
      return member.memberType === memberType;
    });

    const sorted = filtered.sort((a, b) => {

      // Convertir null y undefined a valores verificables
      const aOrder =
        a.displayOrder !== null && a.displayOrder !== undefined
          ? a.displayOrder
          : null;
      const bOrder =
        b.displayOrder !== null && b.displayOrder !== undefined
          ? b.displayOrder
          : null;

      // Si ambos tienen displayOrder válido, ordenar por displayOrder (menor número primero)
      if (aOrder !== null && bOrder !== null) {
        return aOrder - bOrder;
      }

      // Si solo uno tiene displayOrder, el que lo tiene va primero
      if (aOrder !== null && bOrder === null) {
        return -1;
      }
      if (aOrder === null && bOrder !== null) {
        return 1;
      }

      // Si ninguno tiene displayOrder, ordenar alfabéticamente por fullName
      const comparison = a.fullName.localeCompare(b.fullName, undefined, {
        sensitivity: "base",
        numeric: true,
      });
      return comparison;
    });

    return sorted;
  };

  // Función para formatear datos de miembros para CardTeamMember
  const formatMemberData = (member: TeamMemberType): CardTeamMemberProps => ({
    image:
      member.photo?.url ||
      "https://testazfabucket.s3.us-east-2.amazonaws.com/leader_44b2499b_23e6f45b3b.png",
    name: member.fullName,
    position: member.position,
    company: member.association,
    location: getCountryName(member.country),
    email: member.email || undefined,
  });

  // Obtener miembros dinámicamente
  const boardMembers = getMembersByType("board-of-directors", "board-members");
  const honoraryPresidents = getMembersByType(
    "board-of-directors",
    "honorary-presidents"
  );
  const vocalMembers = getMembersByType("committees", "vocal-members");
  const azfaTeamMembers = getMembersByType("azfa-team");

  // Detectar el tab activo basado en la URL y hacer scroll automático
  useEffect(() => {
    const pathSegments = pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Mapear slugs a tabs
    const slugToTab: { [key: string]: string } = {
      "junta-directiva": "junta-directiva",
      comisiones: "comisiones",
      "equipo-azfa": "equipo-azfa",
    };

    if (slugToTab[lastSegment]) {
      setActiveTab(slugToTab[lastSegment]);
      
      // Scroll automático hacia el contenido de los tabs cuando se navega desde el menú
      // Solo hacer scroll si no se ha hecho scroll automático en esta sesión
      if (!hasScrolled) {
        setTimeout(() => {
          if (tabsContentRef.current) {
            tabsContentRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            setHasScrolled(true);
          }
        }, 200); // Delay un poco más para asegurar que el contenido se haya renderizado
      }
    } else if (pathname === "/quienes-somos") {
      // Si está en la página principal, redirigir al tab junta-directiva
      router.replace("/quienes-somos/junta-directiva");
    }
  }, [pathname, hasScrolled, router]); // Ejecutar cuando cambie la URL (incluyendo navegación desde menú)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Actualizar la URL usando pushState para evitar recarga
    window.history.pushState(null, "", `/quienes-somos/${tab}`);
    
    // Scroll suave hacia el inicio del contenido de los tabs
    setTimeout(() => {
      if (tabsContentRef.current) {
        tabsContentRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100); // Pequeño delay para asegurar que el contenido se haya renderizado
    
    // Resetear el estado de scroll para permitir scroll futuro desde menú
    setHasScrolled(false);
  };

  return (
    <div>
      <HeadingPage
        title={hero.title}
        smallTitle={hero.smallTitle}
        textAlign="center"
        image={hero.backgroundImg?.url || JuntaDirectivaImage.src}
        className="min-h-[500px] lg:text-left"
      />

      {intro && (
        <section className="bg-white py-10 lg:pt-16">
          <div className="container mx-auto px-4">
            <div data-aos="fade-up">
              <IntroPage introData={intro} />
            </div>
          </div>
        </section>
      )}

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
                src={
                  tabsSection?.boardOfDirectorsTab?.icon?.customImage?.url ||
                  IconTabs.src
                }
                alt={
                  tabsSection?.boardOfDirectorsTab?.icon?.customImage
                    ?.alternativeText || "Icon Tabs"
                }
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                {tabsSection?.boardOfDirectorsTab?.label || "Junta Directiva"}
              </h2>
            </div>
            <div
              className={`w-1/3 max-w-[350px] border-b-2  hover:border-details lg:pb-14 pb-6 transition cursor-pointer ${
                activeTab === "comisiones" ? "border-details" : "border-white"
              }`}
              onClick={() => handleTabClick("comisiones")}
            >
              <img
                src={
                  tabsSection?.committeesTab?.icon?.customImage?.url ||
                  IconTabs.src
                }
                alt={
                  tabsSection?.committeesTab?.icon?.customImage
                    ?.alternativeText || "Icon Tabs"
                }
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                {tabsSection?.committeesTab?.label || "Comisiones"}
              </h2>
            </div>
            <div
              className={`w-1/3 max-w-[350px] border-b-2  hover:border-details lg:pb-14 pb-6 transition cursor-pointer ${
                activeTab === "equipo-azfa" ? "border-details" : "border-white"
              }`}
              onClick={() => handleTabClick("equipo-azfa")}
            >
              <img
                src={
                  tabsSection?.azfaTeamTab?.icon?.customImage?.url ||
                  IconTabs.src
                }
                alt={
                  tabsSection?.azfaTeamTab?.icon?.customImage
                    ?.alternativeText || "Icon Tabs"
                }
                className="lg:w-16 lg:h-16 w-10 h-10 mx-auto"
              />
              <h2 className="lg:text-h4 text-body2 font-normal text-text-primary">
                {tabsSection?.azfaTeamTab?.label || "Equipo AZFA"}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Section Content */}
      <section ref={tabsContentRef} className="bg-background-1 py-10 lg:py-28">
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
                {boardMembers.length > 0 &&
                  boardMembers.map((member, index) => (
                    <div
                      key={member.id}
                      data-aos="fade-up"
                      data-aos-delay={`${(index % 4) * 100}`}
                    >
                    <CardTeamMember
                      {...formatMemberData(member)}
                    />
                    </div>
                  ))}
              </div>

              {/* Miembros Vocales */}
              {vocalMembers.length > 0 && (
                <>
                  <div className="text-center mt-16">
                    <h2 className="text-h2 font-normal text-text-primary">
                      Miembros Vocales
                    </h2>
                    <span className="w-12 block mx-auto h-[2px] bg-details my-2"></span>
                  </div>

                  {/* Grid Team Members */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {vocalMembers.map((member, index) => (
                      <div
                        key={member.id}
                        data-aos="fade-up"
                        data-aos-delay={`${(index % 4) * 100}`}
                      >
                      <CardTeamMember
                        {...formatMemberData(member)}
                      />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="text-center mt-16">
                <h2 className="text-h2 font-normal text-text-primary">
                  Presidentes Honorarios
                </h2>
                <span className="w-12 block mx-auto h-[2px] bg-details my-2"></span>
              </div>

              {/* Grid Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                {honoraryPresidents.length > 0 &&
                  honoraryPresidents.map((member, index) => (
                    <div
                      key={member.id}
                      data-aos="fade-up"
                      data-aos-delay={`${(index % 4) * 100}`}
                    >
                    <CardTeamMember
                      {...formatMemberData(member)}
                    />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tab Comisiones */}
          {activeTab === "comisiones" && (
            <div>
              {commissionSections &&
                commissionSections.length > 0 &&
                commissionSections?.map((comission, index) => (
                  <div key={index}>
                    <div
                      key={index}
                      className={`flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-6`}
                    >
                      <div
                        className={`w-full lg:w-1/2 ${
                          index % 2 === 0 ? "lg:pr-32" : "lg:pl-32"
                        } pt-6 text-text-primary`}
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                      >
                        <h2 className="text-h2 font-normal text-text-primary mb-8">
                          {comission.title}
                        </h2>
                        <div className="text-[18px] leading-[31px] [&>p]:text[18px]">
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {comission.description}
                          </ReactMarkdown>
                        </div>

                        {/* Leader Profiles */}
                        {comission.leaderProfiles.length > 0 && (
                          <div className="flex flex-row gap-4 items-start mt-5">
                            <img src={IconPerson.src} alt="Icon Person" />
                            <div>
                              <p>{comission.leadersLabel}</p>
                              <p>{comission.leadersText}</p>
                              <div className="flex flex-row gap-4">
                                {comission.leaderProfiles.length > 0 &&
                                  comission.leaderProfiles.map(
                                    (leader, index) => (
                                      <AvatarPerson
                                        key={index}
                                        image={
                                          leader.photo?.url ||
                                          "https://testazfabucket.s3.us-east-2.amazonaws.com/leader_44b2499b_23e6f45b3b.png"
                                        }
                                        alternativeText={
                                          leader.photo?.alternativeText ||
                                          leader.fullName
                                        }
                                        name={leader.fullName}
                                      />
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Team Profiles */}
                        {comission.teamProfiles.length > 0 && (
                          <div className="flex flex-row gap-4 items-start mt-5">
                            <img src={IconPerson.src} alt="Icon Person" />
                            <div>
                              <p>{comission.teamLabel}</p>
                              <div className="flex flex-row flex-wrap gap-4">
                                {comission.teamProfiles.length > 0 &&
                                  comission.teamProfiles.map((team, index) => (
                                    <AvatarPerson
                                      key={index}
                                      image={
                                        team.photo?.url ||
                                        "https://testazfabucket.s3.us-east-2.amazonaws.com/leader_44b2499b_23e6f45b3b.png"
                                      }
                                      alternativeText={
                                        team.photo?.alternativeText ||
                                        team.fullName
                                      }
                                      name={team.fullName}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div 
                        className="w-full lg:w-1/2"
                        data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={
                            comission.coverImage?.url ||
                            "https://testazfabucket.s3.us-east-2.amazonaws.com/leader_44b2499b_23e6f45b3b.png"
                          }
                          alt={
                            comission.coverImage?.alternativeText ||
                            comission.title
                          }
                        />
                      </div>
                    </div>
                    {index < commissionSections.length - 1 && (
                      <hr className="my-16 border-slate-300" />
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Tab Equipo AZFA */}
          {activeTab === "equipo-azfa" && (
            <div>
              {/* Grid Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {azfaTeamMembers.length > 0 &&
                  azfaTeamMembers.map((member, index) => (
                    <div
                      key={member.id}
                      data-aos="fade-up"
                      data-aos-delay={`${(index % 3) * 100}`}
                    >
                    <CardTeamMember
                      {...formatMemberData(member)}
                    />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
