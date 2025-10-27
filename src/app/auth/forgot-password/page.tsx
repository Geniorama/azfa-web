'use client'

import BgImage from '@/assets/img/Frame 115.jpg'
import Link from '@/utils/Link'
import { useState } from 'react'
import Button from '@/utils/Button'
import { useRouter } from 'next/navigation'

const forgotPassword = async (email: string) => {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Error al solicitar recuperación' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(result.error || 'Error al recuperar contraseña');
      }
    } catch {
      setError('Error inesperado. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
        <section className='bg-primary lg:py-20 py-16 px-4 relative overflow-hidden'>
            {/* Background Image */}
            <img src={BgImage.src} alt="Background Image" className='absolute top-0 left-0 w-full h-full object-cover' />

            {/* Content */}
            <div className='container mx-auto relative'>
               <div className='flex flex-row flex-wrap'>
                    <div className='w-full lg:w-1/2 lg:pr-80 space-y-6'>
                        <h1 className='text-white text-5xl lg:text-h1'>Ingrese al portal afiliados</h1>
                        <p className='text-white text-h6 lg:text-h5'>
                            Acceda a información estratégica, exclusiva para miembros de AZFA.
                            Si aún no cuenta con sus credenciales, por favor comuníquese con nuestro equipo.
                        </p>
                        <Link href='mailto:info@azfa.org' className='text-white text-h6 underline underline-offset-8 transition-all duration-300 mb-10 lg:mb-5'>
                           Contactar al equipo AZFA
                        </Link>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <div className='bg-white lg:p-10 p-6 rounded-lg space-y-4 max-w-lg'>
                            <h2 className='text-h3 text-text-primary text-h2'>Recuperar contraseña</h2>
                            <p className='text-caption text-text-primary'>
                                Los campos marcados con asterisco (*) son obligatorios.
                            </p>
                            <form onSubmit={handleSubmit} className='space-y-4 text-text-primary'>
                                {success && (
                                    <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md'>
                                        Se ha enviado un enlace de recuperación a su correo electrónico. Redirigiendo...
                                    </div>
                                )}
                                {error && (
                                    <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
                                        {error}
                                    </div>
                                )}
                                
                                <div className='space-y-2'>
                                    <label htmlFor='email' className='text-body text-text-primary block'>
                                        Correo electrónico *
                                    </label>
                                    <input 
                                        type='email' 
                                        id='email' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting || success}
                                        className='w-full p-2 rounded-md border border-gray-300 disabled:opacity-50' 
                                    />
                                    <small className='text-caption text-text-primary block w-full'>
                                    Ingrese su correo para recibir un enlace de recuperación
                                    </small>
                                </div>

                                <div className='mt-5'>
                                    <Button 
                                        type='submit' 
                                        variant='primary-blue' 
                                        disabled={isSubmitting || success}
                                        fullWidth 
                                        icon 
                                        onClick={() => {}}
                                        className='bg-primary text-white px-4 py-2 rounded-md justify-center disabled:opacity-50'
                                    >
                                        {success ? 'Enlace enviado' : isSubmitting ? 'Enviando enlace...' : 'Enviar enlace'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
               </div>
            </div>
        </section>
    </div>
  )
}
