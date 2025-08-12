import { StrapiButtonType } from "./componentsType";

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
    propertyStatus?: string;
    area?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    locale?: string;
    imgGallery?: {
        url: string;
        alternativeText?: string;
    }[];
    description?: string;
    platinum?: boolean;
    certifications?: StrapiBlock[];
    ctaButton?: StrapiButtonType;
}

interface StrapiBlock {
    type: string;
    format?: string;
    level?: number;
    children?: StrapiBlock[];
    text?: string;
}