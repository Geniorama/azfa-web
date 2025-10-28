"use client";

import MisInmueblesView from "@/views/MisInmueblesView";
import ProtectedPropertiesEditor from "@/components/ProtectedPropertiesEditor";

export default function MisInmuebles() {
  return (
    <ProtectedPropertiesEditor>
      <MisInmueblesView />
    </ProtectedPropertiesEditor>
  );
}