"use client";

import EditarInmuebleView from "@/views/EditarInmuebleView";
import ProtectedPropertiesEditor from "@/components/ProtectedPropertiesEditor";
import { use } from "react";

export default function EditarInmueble({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <ProtectedPropertiesEditor>
      <EditarInmuebleView id={id} />
    </ProtectedPropertiesEditor>
  );
}

