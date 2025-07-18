"use client";

import LogoAzfa from "../../public/logo-azfa.svg";
import { FaBars } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import Button from "@/utils/Button";
import LogoAzfaBlanco from "@/assets/img/logo-azfa-blanco.svg";
import CloseIcon from "@/assets/img/btn-close-icon.svg";
import { useState } from "react";

interface NavItem {
  icon?: React.ReactNode;
  label?: string;
  href: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    icon: <GoHome />,
    href: "/",
  },

  {
    label: "Invierta en Zonas Francas",
    href: "/",
    subItems: [
      {
        label: "Nosotros",
        href: "/nosotros",
      },
      {
        label: "Nosotros",
        href: "/nosotros",
      },
      {
        label: "Nosotros",
        href: "/nosotros",
      },
    ],
  },

  {
    label: "Quiénes Somos",
    href: "/",
    subItems: [
      {
        label: "Nosotros",
        href: "/nosotros",
      },
    ],
  },

  {
    label: "Sala de Prensa",
    href: "/",
    subItems: [
      {
        label: "Nosotros",
        href: "/nosotros",
      },
    ],
  },

  {
    label: "Eventos",
    href: "/",
  },

  {
    label: "Contacto",
    href: "/",
  },

  // Lenguaje
  {
    label: "Esp",
    href: "/",
    subItems: [
      {
        label: "Eng",
        href: "/",
      },
    ],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<number | null>(null);
  
  const handleMouseEnter = (index: number) => {
    setOpenSubmenu(index);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const handleMobileSubmenuToggle = (index: number) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === index ? null : index);
  };
  
  return (
    <header className="bg-white py-4 relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-1/3 flex justify-between items-center gap-4 px-4 lg:px-0">
            <div>
              <img
                className="max-w-[130px] lg:max-w-none"
                src={LogoAzfa.src}
                alt="Logo Azfa"
              />
            </div>
            <button className="text-2xl bg-details-hover text-white rounded-lg p-2 lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <FaBars />
            </button>
          </div>

          <div className={`w-full lg:w-2/3 flex flex-col-reverse justify-end lg:justify-start lg:flex-col items-center lg:items-end gap-4 p-0 lg:px-0 z-10 fixed top-0 left-0 bg-white h-screen lg:h-auto lg:relative lg:translate-x-0 transition-all duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
            {/* Top bar */}
            <div className="flex items-center gap-4 mt-5 lg:mt-0 px-4 lg:px-0">
              <div className="flex flex-row items-start lg:items-center space-x-1 space-y-5 lg:space-y-0 lg:space-x-4 flex-wrap justify-between">
                <Button
                  className="py-2 w-[48%] lg:w-auto"
                  variant="outline-primary"
                  onClick={() => {}}
                >
                  Portal afiliados
                </Button>

                <Button
                  className="py-2 w-[48%] lg:w-auto"
                  variant="outline-primary"
                  onClick={() => {}}
                >
                  Nuestros afiliados
                </Button>

                <Button
                  className="py-2 w-[48%] lg:w-auto"
                  variant="outline-primary"
                  onClick={() => {}}
                >
                  Haga parte de AZFA
                </Button>

                <Button
                  className="py-2 w-[48%] lg:w-auto"
                  variant="primary-blue"
                  onClick={() => {}}
                >
                  PAGOS
                </Button>
              </div>
            </div>

            {/* Bottom bar */}
            <nav className="w-full lg:w-auto -mt-3 lg:mt-0 px-4 lg:px-0">
              <ul className="flex flex-col lg:flex-row items-center gap-0 lg:gap-6">
                {navItems.map((item, index) => (
                  <li 
                    className="w-full lg:w-auto relative group" 
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-black border-[#DDDDDD] border-b lg:border-transparent lg:border-b-2 py-5 lg:pb-1 mb-0 lg:-mb-1 hover:border-details transition justify-between"
                    >
                      {item.icon && (
                        <span className="text-xl ">{item.icon}</span>
                      )}
                      <span className="text-button font-medium">
                        {item.label}
                      </span>
                      {item.subItems && (
                        <button 
                          className="lg:hidden text-details transition-transform duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileSubmenuToggle(index);
                          }}
                        >
                          <FaAngleDown className={`transition-transform duration-300 ${mobileOpenSubmenu === index ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                      {item.subItems && (
                        <FaAngleDown className={`text-details transition-transform duration-300 hidden lg:block ${openSubmenu === index ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                    {item.subItems && (
                      <>
                        {/* Desktop submenu */}
                        <div className={`absolute w-full min-w-[200px] shadow-lg left-0 mt-2 bg-background-1 transition-all duration-300 ease-in-out hidden lg:block ${
                          openSubmenu === index 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible translate-y-[-10px]'
                        }`}>
                          <ul className="flex flex-col text-black">
                            {item.subItems.map((subItem, subIndex) => (
                              <li className="p-4 hover:bg-background-2 transition-all duration-300" key={subIndex}>
                                <Link className="block" href={subItem.href}>{subItem.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Mobile submenu */}
                        <div className={`w-full bg-background-1 lg:shadow-lg lg:hidden transition-all duration-300 ease-in-out ${
                          mobileOpenSubmenu === index 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                          <ul className="flex flex-col text-black">
                            {item.subItems.map((subItem, subIndex) => (
                              <li className="p-4 hover:bg-background-2 transition-all duration-300 border-b border-gray-200" key={subIndex}>
                                <Link className="block" href={subItem.href}>{subItem.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>

            </nav>

            {/* Heading Mobile */}
            <div className="w-full flex justify-between items-center bg-[#10356B] px-4 lg:px-0 py-6 lg:hidden">
              <div className="w-1/2">
                <img
                    src={LogoAzfaBlanco.src}
                    alt="Logo Azfa Blanco"
                    className="w-full max-w-[150px]"
                />
              </div>
              <button className="text-white text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={CloseIcon.src} alt="Close Icon" className="w-full" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
