import React from 'react'
import { LuPencil } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function ButtonEditProperties() {
  const router = useRouter()
  const { isPropertiesEditor } = useAuth()
  const handleEditProperties = () => {
    router.push('/portal-afiliados/mis-inmuebles')
  }

  // Solo mostrar el botón si el usuario tiene el permiso isPropertiesEditor
  if (!isPropertiesEditor) {
    return null
  }

  return (
    <div className='fixed bottom-25 right-0 z-50'>
        <button type='button'  className='bg-primary text-background-1 px-4 py-2 rounded-tl-full rounded-bl-full flex items-center gap-2 cursor-pointer shadow-lg' onClick={handleEditProperties}>
            <LuPencil className="w-5 h-5 text-details-hover" />
            <span className='text-body2'>
                Editar mis inmuebles
            </span>
        </button>
    </div>
  )
}
