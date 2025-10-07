"use client";

import EditarInmuebleView from "@/views/EditarInmuebleView";
import { use } from "react";

export default function EditarInmueble({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <EditarInmuebleView id={id} />
  );
}

