"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyOnViewProps {
  children: ReactNode;
  /** Alto reservado mientras no se monta, para no provocar saltos de layout. */
  minHeight?: number;
  /** Distancia antes de entrar en pantalla a la que se empieza a montar. */
  rootMargin?: string;
  className?: string;
}

/**
 * Monta a sus hijos solo cuando el contenedor está a punto de verse.
 * Pensado para widgets pesados que están lejos del primer pantallazo (p. ej. un
 * carrusel con más de 100 slides): evita que su inicialización compita con la
 * hidratación y la pintura inicial.
 */
export default function LazyOnView({ children, minHeight = 0, rootMargin = "600px 0px", className }: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
