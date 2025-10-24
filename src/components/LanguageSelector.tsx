'use client';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import Cookies from 'js-cookie';

const languages = [
  { code: "es", name: "Español", initials: "ES" },
  { code: "en", name: "English", initials: "EN" },
//   { code: "fr", name: "Français", initials: "FR" },
//   { code: "de", name: "Deutsch", initials: "DE" },
//   { code: "pt", name: "Português", initials: "PT" },
//   { code: "it", name: "Italiano", initials: "IT" },
];

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<string>("es");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>('right');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Al cargar el componente, leemos la cookie para saber el idioma actual
  useEffect(() => {
    const updateLanguageFromCookie = () => {
      const langCookie = Cookies.get("googtrans");
      if (langCookie) {
        const lang = langCookie.split("/")[2];
        if (lang && lang !== currentLanguage) {
          setCurrentLanguage(lang);
        }
      } else if (currentLanguage !== "es") {
        // Si no hay cookie, volver al español por defecto
        setCurrentLanguage("es");
      }
    };

    // Actualizar inmediatamente
    updateLanguageFromCookie();

    // Escuchar cambios en la cookie cada 500ms
    const interval = setInterval(updateLanguageFromCookie, 500);

    return () => clearInterval(interval);
  }, [currentLanguage]);

  // Calcular posición del dropdown usando useLayoutEffect para mejor precisión
  useLayoutEffect(() => {
    const calculateDropdownPosition = () => {
      if (buttonRef.current && isOpen) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const dropdownWidth = 200; // w-[200px]
        
        // Calcular espacio disponible a la derecha e izquierda
        const spaceRight = viewportWidth - buttonRect.right;
        const spaceLeft = buttonRect.left;
        
        // Si hay más espacio a la derecha, usar right-0
        // Si hay más espacio a la izquierda, usar left-0
        if (spaceRight >= dropdownWidth || spaceRight >= spaceLeft) {
          setDropdownPosition('right');
        } else {
          setDropdownPosition('left');
        }
      }
    };

    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // No cerrar el dropdown si el clic es en el mapa
      if (target.closest('svg') || target.closest('[data-map-container]')) {
        return;
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setIsOpen(false);

    // Actualizamos la cookie de Google Translate
    Cookies.set("googtrans", `/${lang}`);

    // Recargamos la página para que el script de Google aplique la traducción
    window.location.reload();
  };

  const currentLangData = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative group w-full md:w-auto notranslate" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-black border-[#DDDDDD] border-b lg:border-transparent lg:border-b-2 py-4 lg:pb-1 mb-0 lg:-mb-1 hover:border-details transition justify-between w-full lg:w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-button notranslate">{currentLangData.initials}</span>
        </div>
        <FaAngleDown
          className={`text-details transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Desktop dropdown */}
      <div
        className={`absolute w-[200px] shadow-lg mt-2 bg-background-1 transition-all duration-300 ease-in-out hidden lg:block ${
          dropdownPosition === 'right' ? 'right-0' : 'left-0'
        } ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-[-10px]"
        }`}
        style={{
          zIndex: 9999,
        }}
      >
        <ul className="flex flex-col text-black">
          {languages.map((lang) => (
            <li
              className="p-4 hover:bg-background-2 transition-all duration-300 cursor-pointer notranslate"
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-button notranslate">{lang.initials}</span>
                <span className="font-medium notranslate">{lang.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`w-full bg-background-1 lg:shadow-lg lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col text-black">
          {languages.map((lang) => (
            <li
              className="p-4 hover:bg-background-2 transition-all duration-300 border-b border-gray-200 cursor-pointer notranslate"
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-button notranslate">{lang.initials}</span>
                <span className="font-medium notranslate">{lang.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
