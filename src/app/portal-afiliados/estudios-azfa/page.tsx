import StudiesView from "@/views/StudiesView";
import { StudiesResponse } from "@/types/contentType";
import { fetchAsUser } from "@/lib/serverAuth";

const QUERY =
  "/studies?populate[0]=featuredImage&populate[1]=downloadableFile&populate[2]=tags&sort=publishDate:desc";

/**
 * Los estudios se piden **con el JWT del usuario**, no de forma anónima. Así
 * la autorización la resuelve Strapi con el rol del visitante y el content type
 * puede quedar cerrado para el rol *Public* (antes `/api/studies` respondía a
 * cualquiera, con la URL de S3 del PDF incluida).
 *
 * El layout ya garantiza que aquí solo se llega con sesión; si aun así no
 * hubiera token, `fetchAsUser` devuelve null y la vista muestra su estado vacío.
 */
export default async function EstudiosAzfa() {
  const response = await fetchAsUser<StudiesResponse>(QUERY);
  const studies = response?.data || null;

  return <StudiesView studies={studies} />;
}
