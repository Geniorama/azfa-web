'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '@/utils/Button'
import IconError from '@/assets/img/icon-no-load.svg'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background-1">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Número 404 grande */}
          <h1 className="text-h1 lg:text-[180px] font-bold text-primary mb-4 leading-none">
            404
          </h1>
          
          {/* Título */}
          <h2 className="text-h4 lg:text-h3 text-text-primary mb-4 font-semibold">
            Página no encontrada
          </h2>
          
          {/* Descripción */}
          <p className="text-body1 lg:text-h6 text-text-secondary mb-8 max-w-2xl">
            Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>

          {/* Icono de error */}
          <div className="mb-12">
            <Image
              src={IconError.src}
              alt="Icono de error"
              width={200}
              height={200}
              className="mx-auto opacity-80"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              onClick={() => router.push('/')}
              variant="primary"
              size="large"
              icon
              className='w-full sm:w-auto'
            >
              Ir al inicio
            </Button>
            
            <Button
              onClick={() => router.back()}
              variant="outline-primary"
              size="large"
              className='w-full sm:w-auto'
            >
              Página anterior
            </Button>
          </div>

          {/* Enlaces adicionales */}
          <div className="mt-12 pt-12 border-t border-background-2 w-full max-w-2xl">
            <p className="text-body2 text-text-secondary mb-4">
              Puede que estos enlaces te sean útiles:
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-body2">
              <button
                onClick={() => router.push('/quienes-somos')}
                className="text-details hover:text-details-hover transition underline cursor-pointer"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => router.push('/nuestros-afiliados')}
                className="text-details hover:text-details-hover transition underline cursor-pointer"
              >
                Nuestros Afiliados
              </button>
              <button
                onClick={() => router.push('/servicios')}
                className="text-details hover:text-details-hover transition underline cursor-pointer"
              >
                Servicios
              </button>
              <button
                onClick={() => router.push('/eventos')}
                className="text-details hover:text-details-hover transition underline cursor-pointer"
              >
                Eventos
              </button>
              <button
                onClick={() => router.push('/contacto')}
                className="text-details hover:text-details-hover transition underline cursor-pointer"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

