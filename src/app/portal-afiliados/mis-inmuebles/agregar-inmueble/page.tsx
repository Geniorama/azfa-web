"use client";

import AgregarInmuebleView from '@/views/AgregarInmuebleView'
import ProtectedPropertiesEditor from '@/components/ProtectedPropertiesEditor'

export default function AgregarInmueble() {
  return (
    <ProtectedPropertiesEditor>
      <AgregarInmuebleView />
    </ProtectedPropertiesEditor>
  )
}
