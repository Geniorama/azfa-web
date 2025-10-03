"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSProviderProps {
  children: React.ReactNode;
}

export default function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    // Inicializar AOS con configuración personalizada
    AOS.init({
      // Duración de las animaciones
      duration: 1000,
      // Offset antes de que comience la animación
      offset: 100,
      // Delay antes de iniciar la animación
      delay: 0,
      // Duración del ease de la animación
      easing: 'ease-in-out-cubic',
      // Si las animaciones deben ejecutarse solo una vez (false para que se repitan al scroll)
      once: false,
      // Configuración específica para dispositivos móviles
      mirror: false,
      // Configuración para el anchor del elemento
      anchorPlacement: 'top-bottom',
      
      // Opciones adicionales
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });

    // Refresh AOS cuando el componente se monta
    AOS.refresh();
  }, []);

  return <>{children}</>;
}
