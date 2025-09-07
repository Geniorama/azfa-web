"use client";

import HeadingPage from "@/components/HeadingPage";
import Button from "@/utils/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IconDeviceMonitor from "@/assets/img/device-monitor.svg";

export default function Estadisticas() {
  const router = useRouter();

  return (
    <div>
      <HeadingPage
        title="Estadísticas"
        smallTitle="Conozca las estadísticas del sector de las Zonas Francas"
        image={"/images/estadisticas.jpg"}
      />

      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 max-w-screen-lg mx-auto items-center border border-details p-6">
            <div className="w-full md:w-3/5 text-text-primary space-y-2">
              <p className="text-h6">
                Usted está viendo una versión limitada del tablero.
              </p>
              <p className="text-body font-light">
                Para acceder al contenido completo, <Link href="/auth/login" className="underline">inicie sesión</Link> como afiliado. ¿Aún no es afiliado? <Link href="/contacto" className="underline">Escríbanos</Link> y le guiaremos en el proceso de afiliación
              </p>
            </div>
            <div className="w-full md:w-2/5 lg:text-right">
              <Button
                variant="primary"
                className="inline-flex justify-between h-auto"
                icon
                onClick={() => router.push("/auth/login")}
              >
                Iniciar sesión
              </Button>
            </div>
          </div>

          {/* Tablero POWER BI */}
          <div className="my-12">
            <span className="text-button text-text-primary"> Dashboard interactivo embebido (Power BI)</span>
            <div className="md:hidden flex items-start gap-2 mt-3">
              <img src={IconDeviceMonitor.src} alt="Icon Device Monitor" />
              <p className="text-caption font-light text-background-3">Este tablero está optimizado para pantallas de escritorio. Le recomendamos acceder desde un computador para visualizar correctamente los datos.</p>
            </div>	
            <div className="my-6">
              <img src="https://placehold.co/1920x1080" alt="Tablero POWER BI" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
