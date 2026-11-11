/**
 * Lee al usuario autenticado en Strapi (`/users/me`) con su JWT.
 *
 * `populate=role` se pide aparte y es opcional: el rol Authenticated no tiene
 * permiso de lectura sobre los roles, y Strapi responde 400 a toda la consulta
 * si se incluye en la misma petición. Con eso se perdían `isEditor`,
 * `isPropertiesEditor` y `affiliateCompany`, y el portal ocultaba los inmuebles.
 */
export async function fetchStrapiMe(baseUrl: string, jwt: string) {
  const headers = { Authorization: `Bearer ${jwt}` };
  const main = await fetch(
    `${baseUrl}/api/users/me?populate[affiliateCompany][fields][0]=id&populate[affiliateCompany][fields][1]=documentId&populate[affiliateCompany][fields][2]=title&populate[affiliateCompany][fields][3]=propertiesLimit`,
    { headers, cache: "no-store" }
  );
  if (!main.ok) return { ok: false as const, status: main.status };

  const user = await main.json();

  try {
    const roleRes = await fetch(
      `${baseUrl}/api/users/me?populate[role][fields][0]=name&populate[role][fields][1]=type`,
      { headers, cache: "no-store" }
    );
    if (roleRes.ok) {
      const withRole = await roleRes.json();
      user.role = withRole.role;
    }
  } catch {
    // El rol es opcional.
  }

  return { ok: true as const, user };
}
