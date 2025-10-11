import { useState, useEffect, useRef } from 'react'

interface CounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    leyend?: string;
    thousandSeparator?: string;
}

export default function Counter({ value, prefix, suffix, leyend, thousandSeparator = ',' }: CounterProps) {
//   Animation up number
const [count, setCount] = useState(0);
const [hasAnimated, setHasAnimated] = useState(false);
const counterRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Duración fija de 3 segundos para todos los contadores
          const duration = 2000; // 2 segundos
          const steps = 60; // Número de pasos para suavizar la animación
          const stepDuration = duration / steps;
          const increment = value / steps;
          
          let currentStep = 0;
          
          const interval = setInterval(() => {
            currentStep++;
            const newValue = Math.min(Math.floor(increment * currentStep), value);
            
            setCount(newValue);
            
            if (currentStep >= steps) {
              setCount(value);
              clearInterval(interval);
            }
          }, stepDuration);
          
          // Cleanup del intervalo cuando el componente se desmonte
          return () => clearInterval(interval);
        }
      });
    },
    {
      threshold: 0.5, // Se activa cuando el 50% del elemento es visible
      rootMargin: '0px 0px -100px 0px' // Se activa 100px antes de que sea completamente visible
    }
  );

  if (counterRef.current) {
    observer.observe(counterRef.current);
  }

  return () => {
    const currentRef = counterRef.current;
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, [value, hasAnimated]);



  // Función para formatear números con separador de miles
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  };

  return (
    <div ref={counterRef} className='space-y-2'>
        <div>
            {prefix && <span className='lg:text-[50px] lg:leading-[55px] 2xl:text-[68px] 2xl:leading-[72px] text-h2 font-medium'>{prefix}</span>}
            <span className='lg:text-[50px] lg:leading-[55px] text-h2 2xl:text-[68px] 2xl:leading-[72px] font-medium'>{formatNumber(count)}</span>
            {suffix && <span className='lg:text-[50px] lg:leading-[55px] 2xl:text-[68px] 2xl:leading-[72px] text-h2 font-medium'>{suffix}</span>}
        </div>
        {leyend && <p className='text-h6 font-normal'>{leyend}</p>}
    </div>
  )
}
