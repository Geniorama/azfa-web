import { strapi } from "@strapi/client";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");
}

const strapiClient = strapi({
    baseURL: STRAPI_URL,
});
export default strapiClient;