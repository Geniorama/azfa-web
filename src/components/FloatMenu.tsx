"use client";

import ArrowLeft from "@/assets/img/arrow-right-s-line.svg";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SocialMediaItemType } from "@/types/componentsType";
import HandUpIcon from "@/assets/img/mdi_hand-pointing-up.svg";

interface FloatMenuProps {
  socialMedia?: SocialMediaItemType[];
}

export default function FloatMenu({ socialMedia = [] }: FloatMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú cuando cambie la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Cerrar el menú cuando se hace click fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // No cerrar el menú si el clic es en el mapa
      if (target.closest('svg') || target.closest('[data-map-container]')) {
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubscribe = () => {
    router.push("/contacto");
  };

  return (
    <div 
      ref={menuRef}
      className="bg-primary text-background-1 rounded-tl-2xl rounded-bl-2xl w-22 overflow-hidden shadow-xl">
        <div className="cursor-pointer p-4 text-center" onClick={handleToggle}>
            <img src={ArrowLeft.src} alt="Arrow Left" className={`w-6 h-6 mx-auto transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            <p className="text-caption">{isOpen ? "OCULTAR" : "MOSTRAR"}</p>
        </div>

        {/* Toggle content */}
        {isOpen && (
            <div className="animate-fade-in">
                <div className="p-4 border-b border-white/20">
                    {/* Social media */}
                    {socialMedia && socialMedia.length > 0 && (
                      <div className="flex flex-col items-center gap-3">
                        {socialMedia.map((social) => (
                          <a
                            key={social.id}
                            href={social.url}
                            target={social.openInNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity duration-300"
                          >
                            {social.icon.type === "react-icon" && social.icon.reactIconName && (
                              <span className="text-2xl">{social.icon.reactIconName}</span>
                            )}
                            {social.icon.type === "custom-image" && social.icon.customImage && (
                              <img 
                                src={social.icon.customImage.url} 
                                alt={social.icon.customImage.alternativeText || ""} 
                                className="w-8 h-8 object-contain"
                              />
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
                <div 
                  className="p-4 bg-white text-primary cursor-pointer hover:bg-details hover:text-white transition-colors duration-300 space-y-1" 
                  onClick={handleSubscribe}
                >
                    <p className="text-caption text-center">UNIRSE AHORA</p>
                    <img src={HandUpIcon.src} alt="Hand Up" className="w-12 h-12 mx-auto" />
                </div>
            </div>
        )}
    </div>
  )
}
