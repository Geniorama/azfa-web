"use client";

import SearchInput from "@/utils/SearchInput";
import { useState } from "react";

// Lista de opciones de ejemplo
const opciones = [
  { id: "1", label: "React", value: "react" },
  { id: "2", label: "Next.js", value: "nextjs" },
  { id: "3", label: "TypeScript", value: "typescript" },
  { id: "4", label: "JavaScript", value: "javascript" },
  { id: "5", label: "Node.js", value: "nodejs" },
  { id: "6", label: "Python", value: "python" },
  { id: "7", label: "Django", value: "django" },
  { id: "8", label: "Flask", value: "flask" },
  { id: "9", label: "Vue.js", value: "vuejs" },
  { id: "10", label: "Angular", value: "angular" },
  { id: "11", label: "Svelte", value: "svelte" },
  { id: "12", label: "PHP", value: "php" },
  { id: "13", label: "Laravel", value: "laravel" },
  { id: "14", label: "WordPress", value: "wordpress" },
  { id: "15", label: "Ruby", value: "ruby" },
  { id: "16", label: "Ruby on Rails", value: "rails" },
  { id: "17", label: "Java", value: "java" },
  { id: "18", label: "Spring Boot", value: "spring" },
  { id: "19", label: "C#", value: "csharp" },
  { id: "20", label: ".NET", value: "dotnet" },
];

interface Opcion {
  id: string;
  label: string;
  value: string;
}

export default function SearchDemo() {
  const [selectedOption, setSelectedOption] = useState<Opcion | null>(null);

  const handleSelect = (option: Opcion | null) => {
    setSelectedOption(option);
    console.log("Opción seleccionada:", option);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Demostración del Componente SearchInput
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Búsqueda de Tecnologías</h2>
            <SearchInput
              placeholder="Escriba el nombre de una tecnología..."
              options={opciones}
              onSelect={handleSelect}
              label="Buscar tecnología"
            />
            
            {selectedOption && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Tecnología seleccionada:
                </h3>
                <p className="text-blue-800">
                  <strong>ID:</strong> {selectedOption.id}<br />
                  <strong>Nombre:</strong> {selectedOption.label}<br />
                  <strong>Valor:</strong> {selectedOption.value}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Características del Componente</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Funcionalidades:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Búsqueda en tiempo real</li>
                  <li>Navegación con teclado (flechas arriba/abajo)</li>
                  <li>Selección con Enter</li>
                  <li>Cerrar con Escape</li>
                  <li>Click fuera para cerrar</li>
                  <li>Hover en opciones</li>
                  <li>Mensaje cuando no hay resultados</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Propiedades:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><code>placeholder</code> - Texto del placeholder</li>
                  <li><code>options</code> - Array de opciones</li>
                  <li><code>onSelect</code> - Callback al seleccionar</li>
                  <li><code>label</code> - Etiqueta del campo</li>
                  <li><code>className</code> - Clases CSS adicionales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 