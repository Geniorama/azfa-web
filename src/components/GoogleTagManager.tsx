'use client';

import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID) return;
    if (document.getElementById('gtm-script')) return; // Evitar duplicados (ej. Strict Mode)

    // Inyectar script de GTM en el head
    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);
  }, []);

  if (!GTM_ID) return null;

  // Fallback: iframe noscript visible en el HTML inicial (por si JS tarda)
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
