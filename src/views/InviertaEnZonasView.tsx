"use client";

import HeadingPage from "@/components/HeadingPage";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import ExampleImage from "@/assets/img/Frame 51.png";
import TitleDecorative from "@/utils/TitleDecorative";
import IconIberoamerica from "@/assets/img/icon-home-servicios 1.svg";
import Counter from "@/utils/Counter";

export default function InviertaEnZonasView() {
  return (
    <div>
      <HeadingPage
        title="Invierta en Zonas Francas"
        image={CoverImage.src}
        textAlign="left"
        className="min-h-[500px] bg-top-right [&>div>h1]:text-center [&>div>p]:text-center [&>div>p]:lg:text-left [&>div>h1]:lg:text-left"
      />

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pr-24">
              <h2 className="text-h2 mb-10">Que son</h2>
              <p className="text-body2 leading-8">
                Las Zonas Francas son áreas geográficas delimitadas dentro de un
                país, que ofrecen incentivos especiales para atraer inversión,
                fomentar el comercio internacional y potenciar la
                competitividad. En estos espacios, las empresas pueden operar en
                general, con beneficios fiscales, aduaneros y logísticos, de
                comercio exterior e innovación impulsando el desarrollo
                económico y la generación de empleo.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={ExampleImage.src} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D5E3EA] py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary">
          <div className="w-full lg:w-1/3">
            <TitleDecorative
              dividerColor="bg-[#94D133]"
              className="text-left items-start"
            >
              Las Zonas Francas de Iberoamérica
            </TitleDecorative>
          </div>
          <div className="w-full lg:w-1/3 space-y-10 mt-14 lg:mt-0">
            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={800}
                prefix="+"
                leyend="Zonas Francas"
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={8000}
                prefix="+"
                leyend="Empresas"
                thousandSeparator="."
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="flex items-center gap-6 mt-8 lg:mt-0">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={1090000}
                prefix="+"
                leyend="Empleos"
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={65800}
                prefix="USD $"
                leyend="millones EXPORTACIÓN"
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={48000}
                prefix="USD $"
                leyend="millones INVERSIONES"
                thousandSeparator="."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse gap-4 text-text-primary items-center py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pl-24">
              <h2 className="text-h2 mb-10">Para qué sirven</h2>
              <p className="text-body2 leading-8">
                Las Zonas Francas cumplen un papel clave en la economía,
                impulsando:{" "}
              </p>{" "}
              <br /> <br />
              <ul className="list-disc list-inside pl-4">
                <li>Generación de empleo y desarrollo industrial.</li>
                <li>Atracción de inversión extranjera directa.</li>
                <li>
                  Facilitación del comercio internacional y exportaciones.
                </li>
                <li>Innovación y transferencia de tecnología.</li>
              </ul>{" "}
              <br />
              <p>
                Estos espacios permiten que los países sean más competitivos y
                se integren mejor a la economía global. <br />
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={ExampleImage.src} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary lg:bg-linear-to-r from-secondary to-white from-70% to-20% py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 text-white items-center py-5 lg:py-10 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pr-24">
              <h2 className="text-h2 mb-10">Beneficios</h2>
              <p className="text-body2 leading-8">
                Las compañías que operan en Zonas Francas disfrutan de ventajas
                exclusivas:{" "}
              </p> <br />

              <ul className="list-disc list-inside pl-4 leading-8">
                <li>
                  Exoneraciones fiscales y aduaneras, reduciendo costos
                  operativos.
                </li>
                <li>
                  Acceso preferencial a mercados globales mediante acuerdos
                  comerciales.
                </li>
                <li>
                  Infraestructura moderna con soluciones logísticas eficientes.
                </li>
                <li>Entornos competitivos que impulsan la productividad.</li>
                <li>
                  Encadenamiento productivo con proveedores y aliados
                  estratégicos.
                </li>
                <li>
                  Cercanía con mercados objetivo, optimizando tiempos y
                  distribución.
                </li>
                <li>
                  Regulación flexible, fomentando la innovación y el
                  crecimiento.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img className="w-full" src={ExampleImage.src} alt="Servicios" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
