'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import IconError from '@/assets/img/icon-no-load.svg'

export default function MaintenancePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background-1 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icono de mantenimiento */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
            <Image
              src={IconError.src}
              alt="Modo mantenimiento"
              width={150}
              height={150}
              className="relative mx-auto opacity-70"
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-h1 lg:text-5xl font-bold text-primary mb-4">
          Sitio en mantenimiento
        </h1>

        {/* Descripción */}
        <p className="text-body1 lg:text-h6 text-text-secondary mb-4">
          Estamos realizando mejoras en nuestro sitio web para brindarte una mejor experiencia.
        </p>
        
        <p className="text-body2 text-text-secondary mb-8">
          Volveremos pronto. Gracias por tu paciencia.
        </p>

        {/* Indicador de progreso */}
        <div className="mb-12">
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-details rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-details rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-details rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="bg-white rounded-lg p-6 border border-background-2 mb-8">
          <h3 className="text-h6 text-text-primary mb-3 font-semibold">
            ¿Necesitas contactarnos?
          </h3>
          <p className="text-body2 text-text-secondary">
            Si tienes una consulta urgente, puedes comunicarte con nosotros a través de nuestras redes sociales o email.
          </p>
        </div>

        {/* Botón de reintentar */}
        <button
          onClick={() => router.refresh()}
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-tr-full rounded-br-full hover:bg-primary/90 transition font-medium text-button"
        >
          Intentar de nuevo
        </button>

        {/* Información adicional */}
        <div className="mt-8 pt-8 border-t border-background-2">
          <p className="text-caption text-text-secondary">
            Por favor, intenta nuevamente en unos minutos.
          </p>
        </div>
      </div>
    </div>
  )
}
