// Datos de ejemplo para el slider del home
export interface SlideData {
  id: number;
  caption: string;
  title: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  backgroundColor?: string;
}

export const homeSliderData: SlideData[] = [
  {
    id: 1,
    caption: "Eventos",
    title: "XXVIII Conferencia de Zonas Francas de Iberoamérica",
    description: "El mayor encuentro del sector en Punta del Este, Uruguay | 19 al 21 de noviembre 2025.",
    button: {
      label: "Conoce más",
      href: "/eventos"
    },
    backgroundColor: "bg-primary",
    backgroundImage: 'https://testazfabucket.s3.us-east-2.amazonaws.com/img_background_9_85c8a1bd32.webp'
  },
  {
    id: 2,
    caption: "Estadísticas",
    title: "Datos que transforman decisiones",
    description: "Accede a nuestro informe dinámico con las principales cifras y tendencias de las zonas francas de Iberoamérica.",
    button: {
      label: "Explorar el informe",
      href: "/invierta-en-zonas-francas/estadisticas"
    },
    backgroundColor: "bg-text-primary",
    backgroundImage: 'https://testazfabucket.s3.us-east-2.amazonaws.com/slide_1_511aab34f0.webp'
  },
  {
    id: 3,
    caption: "Afiliados",
    title: "Somos AZFAmily",
    description: "Conoce nuestra red de afiliados y descubre oportunidades de colaboración en toda Iberoamérica.",
    button: {
      label: "Conoce a nuestros afiliados",
      href: "/nuestros-afiliados"
    },
    backgroundColor: "bg-text-primary",
    backgroundImage: 'https://testazfabucket.s3.us-east-2.amazonaws.com/img_background_3_cda9e6dc9e.webp'
  }
];
