// Forzar a Tailwind a incluir las clases personalizadas:
{/*
  text-h1 text-h2 text-h3 text-h4 text-h5 text-h6 
  text-body1 text-body2 text-caption text-overline text-button 
*/}

export default function TipografiaDemo() {
  return (
    <div className="space-y-6 p-8">
      {/* Comparación con clase estándar de Tailwind */}
      <div>
        <p className="text-4xl font-bold">Ejemplo estándar: text-4xl</p>
      </div>
      {/* H1 */}
      <h1 className="font-inter-tight font-regular text-h1">
        Inter Tight regular (H1)
      </h1>
      {/* H2 */}
      <h2 className="font-inter-tight font-regular text-h2">
        Inter Tight regular (H2)
      </h2>
      {/* H3 */}
      <h3 className="font-inter-tight font-light text-h3">
        Inter Tight light (H3)
      </h3>
      {/* H4 */}
      <h4 className="font-inter-tight font-regular text-h4">
        Inter Tight Regular (H4)
      </h4>
      {/* H5 */}
      <h5 className="font-inter-tight font-regular text-h5">
        Inter Tight Regular (H5)
      </h5>
      {/* H6 */}
      <h6 className="font-inter-tight font-regular text-h6">
        Inter Tight Regular (H6)
      </h6>
      {/* Body 1 */}
      <p className="font-inter-tight font-regular text-body1">
        Inter Tight regular (Body #1)
      </p>
      {/* Body 2 */}
      <p className="font-inter-tight font-light text-body2">
        Inter Tight light (Body #2)
      </p>
      {/* Caption */}
      <span className="font-inter-tight font-regular text-caption">
        Inter Tight regular (Caption)
      </span>
      {/* Overline */}
      <span className="font-inter-tight font-medium text-overline uppercase tracking-widest block">
        Inter Tight medium (Overline)
      </span>
      {/* Botón */}
      <button className="font-inter-tight font-medium text-button bg-black text-white px-4 py-2 rounded">
        Inter Tight medium (Botón)
      </button>
    </div>
  );
} 