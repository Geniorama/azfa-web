"use client";

import { useEffect, useState } from "react";
import FooterImgTop from "@/assets/img/footer-img.svg";
// import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import LogoAzfaBlanco from "@/assets/img/logo-azfa-blanco.svg";
import Link from "next/link";
import { FooterType } from "@/types/componentsType";
import { HiOutlineArrowUp } from "react-icons/hi2";

interface FooterProps {
  showBanner?: boolean;
  footer: FooterType;
}

export default function Footer({ showBanner = true, footer }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón cuando el usuario ha scrolleado más de 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    // Agregar el listener del scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Función para formatear el teléfono para WhatsApp
  const formatPhoneForWhatsApp = (phone: string): string => {
    if (!phone) return "";
    // Remover todos los caracteres que no sean números
    return phone.replace(/[^\d]/g, "");
  };
  return (
    <footer className="bg-text-primary text-white">

      {/* Up Button */}
      <div 
        className={`fixed bottom-5 right-5 z-50 inline-block transition-all duration-300 ${
          showBackToTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button className="bg-details-hover rounded-full p-2 w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-details-hover/80 transition-all duration-300 outline-none" onClick={handleScrollToTop} aria-label="Scroll to top">
          <HiOutlineArrowUp className="w-6 h-6 text-white" />
        </button>
      </div>

      {showBanner && (
        <div className="bg-white">
          <div className="container mx-auto h-100 md:h-auto">
            <img
              className="w-full h-full object-cover md:object-contain"
              src={FooterImgTop.src}
              alt="Footer Image"
            />
          </div>
        </div>
      )}

      {footer.showSocialLinks && footer.socialMedia.length > 0 && (
        <div className="bg-secondary">
          <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
              <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
                <p className="text-h4 text-center lg:text-left">
                  Síganos en nuestras redes sociales
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex justify-center lg:justify-end items-center">
                  <nav>
                    <ul className="flex items-center gap-8 lg:gap-4 text-xl">
                      {footer.socialMedia.map((socialMedia) => (
                        <li key={socialMedia.id}>
                          <a href={socialMedia.url} target={socialMedia.openInNewTab ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:text-details transition hover:opacity-70">
                            {socialMedia.icon.type === "react-icon" && socialMedia.icon.reactIconName && (
                              <span className="text-xl">{socialMedia.icon.reactIconName}</span>
                            )}
                            {socialMedia.icon.type === "custom-image" && socialMedia.icon.customImage && (
                              <img src={socialMedia.icon.customImage.url} alt={socialMedia.icon.customImage.alternativeText || ""} className="w-10 h-10" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-primary">
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8">
            <div className="w-full lg:w-1/4">
              <img
                className="mx-auto lg:mx-0"
                src={footer.contactInfo.logo?.url || LogoAzfaBlanco.src}
                alt={footer.contactInfo.logo?.alternativeText || "Logo Azfa"}
              />
            </div>

            <div className="w-full lg:w-3/4 flex space-x-4 flex-wrap">
              <div className="w-full lg:w-1/2 mr-0 lg:-mr-2 text-center lg:text-left mb-8 lg:mb-0">
                <p className="text-h5">{footer.contactInfo.ctaText || "Afíliese, haga parte de AZFA"}</p>
                <a
                  href={`mailto:${footer.contactInfoGlobal.email}` || "mailto:info@asociacionzonasfrancas.org"}
                  target="_blank"
                  className="text-body2 hover:text-details inline-flex w-auto lg:w-full items-center gap-2 mt-2"
                >
                  {/* Email Icon */}
                  {footer.contactInfoGlobal.emailIcon?.type === "react-icon" && footer.contactInfoGlobal.emailIcon.reactIconName && (
                    <span className="text-xl">{footer.contactInfoGlobal.emailIcon.reactIconName}</span>
                  )}
                  {footer.contactInfoGlobal.emailIcon?.type === "custom-image" && footer.contactInfoGlobal.emailIcon.customImage && (
                    <img src={footer.contactInfoGlobal.emailIcon.customImage.url} alt={footer.contactInfoGlobal.emailIcon.customImage.alternativeText || ""} className="w-5 h-5" />
                  )}
                  <span>{footer.contactInfoGlobal.email || "info@asociacionzonasfrancas.org"}</span>
                </a>
                <a
                  href={`https://wa.me/${formatPhoneForWhatsApp(footer.contactInfoGlobal.phone || "573148724979")}`}
                  target="_blank"
                  className="text-body2 hover:text-details inline-flex items-center gap-2 mt-2 w-auto lg:w-full"
                >
                  {/* Phone Icon */}
                  {footer.contactInfoGlobal.phoneIcon?.type === "react-icon" && footer.contactInfoGlobal.phoneIcon.reactIconName && (
                    <span className="text-xl">{footer.contactInfoGlobal.phoneIcon.reactIconName}</span>
                  )}
                  {footer.contactInfoGlobal.phoneIcon?.type === "custom-image" && footer.contactInfoGlobal.phoneIcon.customImage && (
                    <img src={footer.contactInfoGlobal.phoneIcon.customImage.url} alt={footer.contactInfoGlobal.phoneIcon.customImage.alternativeText || ""} className="w-5 h-5" />
                  )}
                  <span>{footer.contactInfoGlobal.phone || "+57 314 8724979"}</span>
                </a>
              </div>
              <div className="w-full lg:w-1/2 mr-0 lg:-mr-2">
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4 lg:gap-2 text-center lg:text-left">
                  {footer.footerLinksColumns.map((column, index) => (
                    <div className={`column-${index + 1} w-full lg:w-1/${footer.footerLinksColumns.length}`} key={column.id}>
                      <nav>
                        <ul className="flex flex-col gap-4 lg:gap-2">
                          {column.links.map((link) => (
                            <li key={link.id}>
                              <Link
                                href={link.url}
                                target={link.openInNewTab ? "_blank" : "_self"}
                                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  ))}

                </div>
              </div>

              <hr className="w-full mt-10 mb-4 mr-0 lg:-mr-2 opacity-50" />

              <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:-mr-2 gap-4 lg:gap-0 text-center lg:text-left">
                <p className="text-caption text-[#F2F1FA] opacity-30">
                  {footer.copyright.text || "Copyright © 2025 AZFA | Todos los derechos reservados"}
                  {footer.copyright.legalLinks.length > 0 && " | "}
                  {footer.copyright.legalLinks.map((legalLink, index) => (
                    <span key={legalLink.id}>
                      <Link
                        href={legalLink.url}
                        target={legalLink.openInNewTab ? "_blank" : "_self"}
                        rel={legalLink.openInNewTab ? "noopener noreferrer" : undefined}
                        className="text-caption hover:underline hover:text-white transition whitespace-nowrap"
                      >
                        {legalLink.label}
                      </Link>
                      {index < footer.copyright.legalLinks.length - 1 && " | "}
                    </span>
                  ))}
                </p>

                <p className="text-caption text-[#F2F1FA] opacity-30 pr-14 2xl:pr-0">
                  {footer.copyright.developedByText || "Realizado por"}{" "}
                  <Link
                    href={footer.copyright.developedByLink.url}
                    target={footer.copyright.developedByLink.openInNewTab ? "_blank" : "_self"}
                    rel={footer.copyright.developedByLink.openInNewTab ? "noopener noreferrer" : undefined}
                    className="text-caption hover:underline hover:text-white transition"
                  >
                    {footer.copyright.developedByLink.label || "Ekon7.com"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
