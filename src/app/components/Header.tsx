"use client";

import LogoAzfa from "../../../public/logo-azfa.svg";
import { FaBars } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import Button from "@/app/utils/Button";
import LogoAzfaBlanco from "@/app/assets/img/logo-azfa-blanco.svg";
import CloseIcon from "@/app/assets/img/btn-close-icon.svg";
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
                  <li className="w-full lg:w-auto" key={index}>
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
                        <FaAngleDown className="text-details" />
                      )}
                    </Link>
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
