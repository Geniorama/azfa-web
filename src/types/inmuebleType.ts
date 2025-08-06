export interface InmuebleType {
    id: string;
    title: string;
    image?: string;
    offerType?: string;
    propertyType?: string;
    propertyUse?: string;
    city?: string;
    country?: string;
    region?: string;
    status?: string;
    area?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    locale?: string;
    gallery?: string[];
    description?: string;
    platinum?: boolean;
    certificates?: {
        id: string;
        name: string;
        url?: string;
    }[];
}