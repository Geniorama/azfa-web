'use client'

import { useEffect, useState } from 'react';

export function useGoogleTranslateBar() {
  const [isTranslateBarVisible, setIsTranslateBarVisible] = useState(false);

  useEffect(() => {
    const checkTranslateBar = () => {
      // Buscar la barra de Google Translate de diferentes maneras
      const translateElement = document.querySelector('#google_translate_element');
      const translateFrame = document.querySelector('iframe[src*="translate.google.com"]');
      const translateBar = document.querySelector('div[style*="position: fixed"][style*="top: 0"]');
      const googTeBanner = document.querySelector('.goog-te-banner-frame');
      
      // Verificar si alguno de estos elementos está presente y visible
      const isVisible = 
        (translateElement && translateElement.offsetHeight > 0) ||
        (translateFrame && translateFrame.offsetHeight > 0) ||
        (translateBar && translateBar.offsetHeight > 0) ||
        (googTeBanner && googTeBanner.offsetHeight > 0);
      
      setIsTranslateBarVisible(!!isVisible);
    };

    // Verificar inicialmente después de un pequeño delay para que el DOM esté listo
    const initialCheck = setTimeout(checkTranslateBar, 100);

    // Crear un observer para detectar cambios en el DOM
    const observer = new MutationObserver(() => {
      checkTranslateBar();
    });

    // Observar cambios en el body y head
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true
    });

    // También verificar periódicamente por si acaso
    const interval = setInterval(checkTranslateBar, 500);

    return () => {
      clearTimeout(initialCheck);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return isTranslateBarVisible;
}
