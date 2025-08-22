'use client'

import Link from '@/utils/Link'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from 'react';
import Button from '@/utils/Button';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div>
        <section className='bg-primary py-20'>
            <div className='container mx-auto'>
               <div className='flex flex-row'>
                    <div className='w-full lg:w-1/2 pr-80 space-y-6'>
                        <h1 className='text-white text-h1'>Ingrese al portal afiliados</h1>
                        <p className='text-white text-h5'>
                            Acceda a información estratégica, exclusiva para miembros de AZFA.
                            Si aún no cuenta con sus credenciales, por favor comuníquese con nuestro equipo.
                        </p>
                        <Link href='mailto:info@azfa.org' className='text-white text-h6 underline underline-offset-8 transition-all duration-300 mb-5'>
                           Contactar al equipo AZFA
                        </Link>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <div className='bg-white p-10 rounded-lg space-y-4 max-w-lg'>
                            <h2 className='text-h3 text-text-primary text-h2'>Acceso a Afiliados</h2>
                            <p className='text-caption text-text-primary'>
                                Los campos marcados con asterisco (*) son obligatorios.
                            </p>
                            <form className='space-y-4 text-text-primary'>
                                <div className='space-y-2'>
                                    <label htmlFor='email' className='text-body text-text-primary block'>
                                        Correo electrónico *
                                    </label>
                                    <input type='email' id='email' className='w-full p-2 rounded-md border border-gray-300' />
                                </div>
                                
                                <div className='space-y-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <label htmlFor='password' className='text-body text-text-primary block'>
                                            Contraseña *
                                        </label>

                                        <div onClick={() => setShowPassword(!showPassword)} className='flex flex-row items-center gap-1 cursor-pointer'>
                                            <button type='button'>
                                                {showPassword ? <IoEyeOutline className='w-4 h-4' /> : <IoEyeOffOutline className='w-4 h-4' />}
                                            </button>
                                            <span className='text-caption text-text-primary'>{showPassword ? 'Ocultar' : 'Mostrar'}</span>
                                        </div>
                                    </div>

                                    <input type={showPassword ? 'text' : 'password'} id='password' className='w-full p-2 rounded-md border border-gray-300' />

                                    <small className='text-caption text-text-primary block text-right w-full'>
                                        <Link href='/auth/forgot-password' className='text-text-primary underline underline-offset-8 transition-all duration-300 inline-block'>
                                            ¿Olvidó su contraseña?
                                        </Link>
                                    </small>
                                </div>

                                <div className='mt-5'>
                                    <Button type='submit' variant='primary-blue' onClick={() => {}} fullWidth icon className='bg-primary text-white px-4 py-2 rounded-md justify-center'>
                                        Iniciar sesión
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
