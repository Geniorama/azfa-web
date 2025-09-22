import FooterImgTop from "@/assets/img/footer-img.svg"
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import LogoAzfaBlanco from "@/assets/img/logo-azfa-blanco.svg";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  showBanner?: boolean;
}

export default function Footer({ showBanner = true }: FooterProps) {
  return (
    <footer className='bg-text-primary text-white'>
      {showBanner && (
        <div className="bg-white">
          <div className="container mx-auto h-100 md:h-auto">
              <img className="w-full h-full object-cover md:object-contain" src={FooterImgTop.src} alt="Footer Image" />
          </div>
        </div>
      )}

      <div className="bg-secondary">
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
                <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
                    <p className="text-h4 text-center lg:text-left">Síganos en nuestras redes sociales</p>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:justify-end items-center">
                        <nav>
                            <ul className="flex items-center gap-8 lg:gap-4 text-xl">
                                <li>
                                    <a className="hover:text-details transition" href="#" target="_blank">
                                        <FaLinkedinIn />
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-details transition" href="#" target="_blank">
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-details transition" href="#" target="_blank">
                                        <FaXTwitter />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8">
                <div className="w-full lg:w-1/4">
                    <img className="mx-auto lg:mx-0" src={LogoAzfaBlanco.src} alt="Logo Azfa" />
                </div>

                <div className="w-full lg:w-3/4 flex space-x-4 flex-wrap">
                    <div className="w-full lg:w-1/2 mr-0 lg:-mr-2 text-center lg:text-left mb-8 lg:mb-0">
                        <p className="text-h5">Afíliese, haga parte de AZFA</p>
                        <a href="mailto:info@asociacionzonasfrancas.org" target="_blank" className="text-body2 hover:text-details inline-flex w-auto lg:w-full items-center gap-2 mt-2">
                            <IoMailOutline className="text-xl" />
                            <span>info@asociacionzonasfrancas.org</span>
                        </a>
                        <a href="https://wa.me/573148724979" target="_blank" className="text-body2 hover:text-details inline-flex items-center gap-2 mt-2 w-auto lg:w-full">
                            <FaWhatsapp className="text-xl" />
                            <span>+57 314 8724979</span>
                        </a>
                    </div>
                    <div className="w-full lg:w-1/2 mr-0 lg:-mr-2">
                        <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-4 lg:gap-2 text-center lg:text-left">
                            <div className="w-full lg:w-1/2">
                                <nav>
                                    <ul className="flex flex-col gap-4 lg:gap-2">
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Portal afiliados
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/nuestros-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Nuestros afiliados
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/sala-de-prensa/noticias" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Noticias
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <nav>
                                    <ul className="flex flex-col gap-4 lg:gap-2">
                                        <li>
                                            <Link href="#" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Eventos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Contacto
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full mt-10 mb-4 mr-0 lg:-mr-2 opacity-50" />

                    <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:-mr-2 gap-4 lg:gap-0 text-center lg:text-left">
                        <p className="text-caption text-[#F2F1FA] opacity-30">
                            Copyright © 2025 AZFA  | Todos los derechos reservados | <Link href="#" className="text-caption hover:underline hover:text-white transition whitespace-nowrap">Términos y condiciones</Link> | <Link href="#" className="text-caption hover:underline hover:text-white transition whitespace-nowrap">Políticas de privacidad</Link>
                        </p>

                        <p className="text-caption text-[#F2F1FA] opacity-30">
                            Realizado por <Link href="#" className="text-caption hover:underline hover:text-white transition">Ekon7.com</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
