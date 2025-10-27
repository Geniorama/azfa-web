'use client'

import BgImage from '@/assets/img/Frame 115.jpg'
import Link from '@/utils/Link'
import { useState, useEffect, Suspense } from 'react'
import Button from '@/utils/Button'
import { useRouter, useSearchParams } from 'next/navigation'

const resetPassword = async (code: string, password: string, passwordConfirmation: string) => {
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        code, 
        password, 
        passwordConfirmation 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Error al restablecer contraseña' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validaciones
    if (!code) {
      setError('Código de recuperación no válido');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(code, password, passwordConfirmation);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(result.error || 'Error al restablecer contraseña');
      }
    } catch {
      setError('Error inesperado. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si no hay código, redirigir
  useEffect(() => {
    if (!code) {
      router.push('/auth/forgot-password');
    }
  }, [code, router]);

  if (!code) {
    return null; // O un componente de loading
  }

  return (
    <div>
        <section className='bg-primary lg:py-20 py-16 px-4 relative overflow-hidden'>
            {/* Background Image */}
            <img src={BgImage.src} alt="Background Image" className='absolute top-0 left-0 w-full h-full object-cover' />

            {/* Content */}
            <div className='container mx-auto relative'>
               <div className='flex flex-row flex-wrap'>
                    <div className='w-full lg:w-1/2 lg:pr-80 space-y-6'>
                        <h1 className='text-white text-5xl lg:text-h1'>Restablecer contraseña</h1>
                        <p className='text-white text-h6 lg:text-h5'>
                            Ingrese su nueva contraseña para el Portal de Afiliados AZFA.
                        </p>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <div className='bg-white lg:p-10 p-6 rounded-lg space-y-4 max-w-lg'>
                            <h2 className='text-h3 text-text-primary text-h2'>Nueva contraseña</h2>
                            <p className='text-caption text-text-primary'>
                                Los campos marcados con asterisco (*) son obligatorios.
                            </p>
                            <form onSubmit={handleSubmit} className='space-y-4 text-text-primary'>
                                {success && (
                                    <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md'>
                                        Contraseña restablecida exitosamente. Redirigiendo al inicio de sesión...
                                    </div>
                                )}
                                {error && (
                                    <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
                                        {error}
                                    </div>
                                )}
                                
                                <div className='space-y-2'>
                                    <label htmlFor='password' className='text-body text-text-primary block'>
                                        Nueva contraseña *
                                    </label>
                                    <input 
                                        type='password' 
                                        id='password' 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={isSubmitting || success}
                                        placeholder='Mínimo 6 caracteres'
                                        className='w-full p-2 rounded-md border border-gray-300 disabled:opacity-50' 
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor='passwordConfirmation' className='text-body text-text-primary block'>
                                        Confirmar contraseña *
                                    </label>
                                    <input 
                                        type='password' 
                                        id='passwordConfirmation' 
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={isSubmitting || success}
                                        placeholder='Repite la contraseña'
                                        className='w-full p-2 rounded-md border border-gray-300 disabled:opacity-50' 
                                    />
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
                                        {success ? 'Contraseña restablecida' : isSubmitting ? 'Procesando...' : 'Restablecer contraseña'}
                                    </Button>
                                </div>

                                <div className='text-center mt-4'>
                                    <Link href='/auth/login' className='text-text-primary underline text-sm'>
                                        Volver al inicio de sesión
                                    </Link>
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

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
