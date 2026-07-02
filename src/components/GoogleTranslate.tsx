'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * Carga el script de Google Translate SOLO cuando hay una traducción activa.
 *
 * El LanguageSelector no llama a la API de Google: únicamente escribe/borra la
 * cookie `googtrans` (formato `/es/<lang>`) y recarga la página. El script
 * `element.js` solo tiene trabajo real que hacer cuando el destino es distinto
 * del idioma original (es). Para los visitantes en español —la mayoría— cargar
 * ese script de terceros solo consume hilo principal (TBT/main-thread) sin
 * traducir nada. Por eso aquí se difiere hasta que la cookie lo justifique.
 *
 * Flujo: usuario elige inglés → LanguageSelector setea `googtrans=/es/en` y
 * recarga → en la nueva carga esta cookie ya existe → se monta el script y
 * Google aplica la traducción. Al volver a español se borra la cookie y en la
 * siguiente carga el script deja de incluirse.
 */
export default function GoogleTranslate() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get('googtrans');
    if (!cookie) return;
    const target = cookie.split('/')[2];
    if (target && target !== 'es') {
      setActive(true);
    }
  }, []);

  return (
    <>
      {/* Div que usa Google Translate para inyectar su widget (oculto). */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      {active && (
        <>
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'es',
                  autoDisplay: false,
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          />
        </>
      )}
    </>
  );
}
