"use client";

import LogoAzfa from "../../public/logo-azfa.svg";
import { FaAngleDown } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Button from "@/utils/Button";
import LogoAzfaBlanco from "@/assets/img/logo-azfa-blanco.svg";
import CloseIcon from "@/assets/icons/close-menu.svg";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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
    href: "/invierta-en-zonas-francas",
    subItems: [
      {
        label: "Normativa Legal",
        href: "/invierta-en-zonas-francas/normativa-legal",
      },
      {
        label: "Estadísticas",
        href: "/invierta-en-zonas-francas/estadisticas",
      },
      {
        label: "Oferta Inmobiliaria",
        href: "/invierta-en-zonas-francas/oferta-inmobiliaria",
      },
      {
        label: "Publicaciones",
        href: "/invierta-en-zonas-francas/publicaciones",
      },
    ],
  },

  {
    label: "Quiénes Somos",
    href: "/",
    subItems: [
      {
        label: "Junta Directiva",
        href: "/junta-directiva",
      },
      {
        label: "Comisiones",
        href: "/comisiones",
      },
      {
        label: "Equipo AZFA",
        href: "/equipo-azfa",
      },
    ],
  },

  {
    label: "Sala de Prensa",
    href: "/",
    subItems: [
      {
        label: "Noticias",
        href: "/noticias",
      },
      {
        label: "Podcast",
        href: "/podcast",
      },
      {
        label: "Newsletter",
        href: "/newsletter",
      },
      {
        label: "Blog",
        href: "/blog",
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleMouseEnter = (index: number) => {
    setOpenSubmenu(index);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const handleMobileSubmenuToggle = (index: number) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };
  
  return (
    <header className="bg-white py-4 relative z-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-1/3 flex justify-between items-center gap-4 px-4 lg:px-0">
            <div>
              <Link href="/">
                <img
                  className="max-w-[130px] lg:max-w-none"
                  src={LogoAzfa.src}
                  alt="Logo Azfa"
                />
              </Link>
            </div>
            <button className="text-2xl bg-details-hover text-white rounded-tr-lg rounded-br-lg p-2 lg:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10" onClick={() => setIsMobileMenuOpen(true)}>
              <span className="block w-full h-[2px] bg-white rounded-full"></span>
              <span className="block w-full h-[2px] bg-white rounded-full"></span>
              <span className="block w-full h-[2px] bg-white rounded-full"></span>
              {/* <FaBars /> */}
            </button>
          </div>

          <div className={`w-full lg:w-2/3 flex flex-col-reverse justify-end lg:justify-start lg:flex-col items-center lg:items-end gap-4 p-0 lg:px-0 z-10 fixed top-0 left-0 bg-white h-screen lg:h-auto lg:relative lg:translate-x-0 transition-all duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
            {/* Top bar */}
            <div className="flex items-center gap-4 mt-5 lg:mt-0 px-4 lg:px-0">
              <div className="flex flex-row items-start lg:items-center space-x-1 space-y-3 lg:space-y-0 lg:space-x-4 flex-wrap justify-between">
                {isAuthenticated ? (
                  <>
                    <div className="relative" ref={userMenuRef}>
                      <Button
                        className="py-2 w-[48%] lg:w-auto"
                        variant="outline-primary"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                      >
                        <FaUser className="mr-2" />
                        {user?.username || user?.email}
                      </Button>
                      
                      {/* User dropdown menu */}
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                              {user?.email}
                            </div>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FaSignOutAlt className="mr-2" />
                              Cerrar sesión
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Button
                    className="py-2 w-full lg:w-auto"
                    variant="outline-primary"
                    onClick={() => router.push('/portal-afiliados')}
                  >
                    Portal afiliados
                  </Button>
                )}

                <Button
                  className="py-2 w-full lg:w-auto"
                  variant="outline-primary"
                  onClick={() => router.push('/nuestros-afiliados')}
                >
                  Nuestros afiliados
                </Button>

                <Button
                  className="py-2 w-full lg:w-auto"
                  variant="outline-primary"
                  onClick={() => {}}
                >
                  Haga parte de AZFA
                </Button>

                <Button
                  className="py-2 w-full lg:w-auto"
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
                        <span className="text-xl">{item.icon}</span>
                      )}
                      {item.label && (
                        <span className="text-button font-medium">
                          {item.label}
                        </span>
                      )}
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
