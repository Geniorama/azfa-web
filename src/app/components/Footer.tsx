import FooterImgTop from "@/app/assets/img/footer-img.svg"
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import LogoAzfaBlanco from "@/app/assets/img/logo-azfa-blanco.svg";
import { IoMailOutline } from "react-icons/io5";
import { SlScreenSmartphone } from "react-icons/sl";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-text-primary text-white'>
      <div className="bg-white">
        <div className="container mx-auto">
            <img className="w-full" src={FooterImgTop.src} alt="Footer Image" />
        </div>
      </div>

      <div className="bg-secondary">
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center">
                <div className="w-full lg:w-1/2">
                    <p className="text-h4">Síganos en nuestras redes sociales</p>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-end items-center">
                        <nav>
                            <ul className="flex items-center gap-4 text-xl">
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
            <div className="flex gap-8">
                <div className="w-full lg:w-1/4">
                    <img src={LogoAzfaBlanco.src} alt="Logo Azfa" />
                </div>

                <div className="w-full lg:w-3/4 flex space-x-4 flex-wrap">
                    <div className="w-full lg:w-1/2 lg:-mr-2">
                        <p className="text-h5">Afíliese, haga parte de AZFA</p>
                        <a href="mailto:director@asociacionzonasfrancas.org" target="_blank" className="text-body2 hover:text-details flex items-center gap-2 mt-2">
                            <IoMailOutline className="text-xl" />
                            <span>director@asociacionzonasfrancas.org</span>
                        </a>
                        <a href="tel:+573178520000" target="_blank" className="text-body2 hover:text-details flex items-center gap-2 mt-2">
                            <SlScreenSmartphone className="text-xl" />
                            <span>+57 000 000 0000</span>
                        </a>
                    </div>
                    <div className="w-full lg:w-1/2 lg:-mr-2">
                        <div className="flex gap-2">
                            <div className="w-full lg:w-1/2">
                                <nav>
                                    <ul className="flex flex-col gap-2">
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Portal afiliados
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Nuestros afiliados
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/portal-afiliados" className="text-body2 text-[#F2F1FA] opacity-30 hover:underline hover:opacity-100 transition underline-offset-8">
                                            Noticias
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <nav>
                                    <ul className="flex flex-col gap-2">
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

                    <hr className="w-full mt-10 mb-4 lg:-mr-2 opacity-50" />

                    <div className="w-full flex justify-between items-center lg:-mr-2">
                        <p className="text-caption text-[#F2F1FA] opacity-30">
                            Copyright © 2025 AZFA  | Todos los derechos reservados | <Link href="#" className="text-caption hover:underline hover:text-white transition">Términos y condiciones</Link> | <Link href="#" className="text-caption hover:underline hover:text-white transition">Políticas de privacidad</Link>
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
