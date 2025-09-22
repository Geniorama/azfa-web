"use client"

import HeadingPage from "@/components/HeadingPage"
import BgContacto from "@/assets/img/bg-contacto.jpg"
import IconPhone from "@/assets/img/phone-contact.svg"
import IconEmail from "@/assets/img/email-contact.svg"
import IconFacebook from "@/assets/img/facebook-fill.svg"
import IconInstagram from "@/assets/img/instagram-fill.svg"
import IconLinkedin from "@/assets/img/linkedin-fill.svg"
import IconYoutube from "@/assets/img/youtube-fill.svg"
import IconSpotify from "@/assets/img/spotify-fill.svg"
import IconTwitterX from "@/assets/img/twitter-x-line.svg"
import Button from "@/utils/Button"
import Link from "next/link"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"


export default function ContactoView() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    empresa: '',
    asunto: '',
    mensaje: '',
    aceptaTerminos: false
  })
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recaptchaValue) {
      alert('Por favor, complete el reCAPTCHA')
      return
    }

    if (!formData.aceptaTerminos) {
      alert('Debe aceptar los términos y condiciones')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Aquí puedes enviar los datos a tu API
      console.log('Datos del formulario:', formData)
      console.log('reCAPTCHA token:', recaptchaValue)
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Mensaje enviado correctamente')
      
      // Resetear formulario
      setFormData({
        nombre: '',
        telefono: '',
        empresa: '',
        asunto: '',
        mensaje: '',
        aceptaTerminos: false
      })
      setRecaptchaValue(null)
      
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Error al enviar el mensaje')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div>
        <HeadingPage 
          title="Contacto" 
          smallTitle="Su mensaje puede iniciar algo grande."
          image={BgContacto.src}
          className="lg:pb-64"
        />

        <section className=" py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 text-text-primary">
              <div className="w-full md:w-1/2 mb-10 lg:mb-0">
                <h2 className="text-h2">¿Necesita asesoría?</h2>
                <h3 className="text-h2">contáctenos</h3>

                {/* Phone */}
                <div className="flex lg:flex-row flex-col lg:items-center gap-2 lg:gap-6 p-5 mt-4">
                  <div className="w-10 h-10">
                    <img src={IconPhone.src} alt="icon-phone" />
                  </div>
                  <div>
                    <p className="text-h6">Teléfono</p>
                    <a href="https://wa.me/573148724979" target="_blank" className="text-body1 hover:text-details transition">
                      +57 314 8724979
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex lg:flex-row flex-col lg:items-center gap-2 lg:gap-6 p-5 lg:mt-4">
                  <div className="w-10 h-10">
                    <img src={IconEmail.src} alt="icon-email" className="w-full block" />
                  </div>
                  <div>
                    <p className="text-h6">Email</p>
                    <a href="mailto:info@asociacionzonasfrancas.org" className="text-body1 hover:text-details transition">
                      info@asociacionzonasfrancas.org
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <ul className="flex flex-row justify-center lg:justify-start items-center gap-6 mt-12">
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconFacebook.src} alt="icon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconInstagram.src} alt="icon-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconLinkedin.src} alt="icon-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconYoutube.src} alt="icon-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconSpotify.src} alt="icon-spotify" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                        <img src={IconTwitterX.src} alt="icon-twitter-x" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative z-10">
                <div className="bg-white lg:p-10 p-4 rounded-lg lg:-mt-64">
                  <div className="text-center space-y-4">
                    <h5 className="text-h2">¿Desea que le contactemos?</h5>
                    <p className="text-h5">Si desea contactarnos puede hacerlo a través del siguiente formulario</p>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div className="flex lg:flex-row flex-col items-center gap-2">
                      <input 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full lg:w-1/2 border border-background-2 rounded-md p-3 focus:outline-details" 
                        type="text" 
                        placeholder="Nombre" 
                        required 
                      />
                      <input 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full lg:w-1/2 border border-background-2 rounded-md p-3 focus:outline-details" 
                        type="tel" 
                        placeholder="Teléfono" 
                        required 
                      />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <input 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full border border-background-2 rounded-md p-3 focus:outline-details" 
                        type="text" 
                        placeholder="Empresa" 
                        required 
                      />
                      <input 
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleInputChange}
                        className="w-full border border-background-2 rounded-md p-3 focus:outline-details" 
                        type="text" 
                        placeholder="Asunto" 
                        required 
                      />
                    </div>
                    <textarea 
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      className="w-full border border-background-2 rounded-md p-3 focus:outline-details" 
                      placeholder="Información adicional" 
                      rows={4}
                      required
                    ></textarea>
                    
                    {/* reCAPTCHA */}
                    <div className="flex justify-start">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "TU_SITE_KEY_AQUI"}
                        onChange={handleRecaptchaChange}
                        theme="light"
                      />
                    </div>
                    
                    {/* Acceptance of the terms and conditions */}
                    <div className="flex flex-row items-start lg:items-center gap-2">
                      <input 
                        name="aceptaTerminos"
                        checked={formData.aceptaTerminos}
                        onChange={handleInputChange}
                        type="checkbox" 
                        id="terms" 
                        required
                        className="mt-1 lg:mt-0"
                      />
                      <label htmlFor="terms">He leído y acepto la <Link target="_blank" className="underline hover:text-details transition" href="/politica-de-privacidad">política de privacidad</Link> y el <Link target="_blank" className="underline hover:text-details transition" href="/aviso-legal">aviso legal</Link>. *</label>
                    </div>
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => {}}
                      className="w-full lg:w-auto text-center lg:text-left justify-center lg:justify-start"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
