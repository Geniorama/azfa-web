"use client";

import AdSection from "./AdSection";

// Ejemplo de uso del componente AdSection
export default function AdSectionExample() {
  return (
    <div>
      {/* Anuncios para la sección inferior de noticias */}
      <AdSection 
        position="bottom-news-archive"
        className="bg-gray-50"
      />

      {/* Anuncios para la sección inferior de newsletter */}
      <AdSection 
        position="bottom-newsletter-archive"
        className="bg-white"
      />

      {/* Anuncios para la sección inferior de podcast */}
      <AdSection 
        position="bottom-podcast-archive"
        className="bg-gray-100"
      />
    </div>
  );
}
