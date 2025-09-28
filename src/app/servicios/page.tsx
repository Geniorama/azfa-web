import ServiciosView from '@/views/ServiciosView'
import { ServicesPageType } from '@/types/componentsType'

const getServicios = async () => {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/services-page?populate[0]=headingSection&populate[1]=headingSection.backgroundImg&populate[2]=intro&populate[3]=intro.icon&populate[4]=contentSection&populate[5]=contentSection.coverImage&populate[6]=contentSection.button`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar cada hora
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching servicios:", error);
    return null;
  }
}

export default async function Servicios() {
  const serviciosResponse = await getServicios();
  const serviciosData: ServicesPageType | null = serviciosResponse?.data || null;
  
  console.log("servicios", serviciosData);

  return (
    <ServiciosView serviciosData={serviciosData} />
  )
}
