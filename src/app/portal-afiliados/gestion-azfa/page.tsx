import ManagementView from "@/views/ManagementView";
import { ManagementResponse } from "@/types/contentType";
import { fetchAsUser } from "@/lib/serverAuth";

const MANAGEMENTS =
  "/managements?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc";
const STUDIES =
  "/studies?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc";

/**
 * Igual que en estudios-azfa: se pide con el JWT del usuario para que Strapi
 * aplique el rol, en lugar de leer el endpoint de forma anónima.
 *
 * Se conserva el respaldo a `studies` que ya existía por si `managements` no
 * estuviera disponible en el CMS.
 */
const getManagement = async (): Promise<ManagementResponse | null> => {
  const data =
    (await fetchAsUser<ManagementResponse>(MANAGEMENTS)) ??
    (await fetchAsUser<ManagementResponse>(STUDIES));

  if (!data) return null;

  return { data: data.data || [], meta: data.meta || {} };
};

export default async function GestionAzfa() {
  const response = await getManagement();
  const management = response?.data || null;

  return (
    <ManagementView
      management={management}
      title="Portal afiliados"
      smallTitle="Consulte reportes institucionales, memorias de gestión y documentos clave sobre el trabajo de la Asociación"
      image="/images/gestion-azfa.jpg"
      slug="gestion-azfa"
    />
  );
}
