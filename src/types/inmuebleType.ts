import { StrapiButtonType } from "./componentsType";

export interface InmuebleType {
    id: string;
    documentId?: string;
    title: string;
    image?: string;
    offerType?: string[];
    propertyType?: string[];
    propertyUse?: string[];
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
        id?: number;
        url: string;
        alternativeText?: string;
    }[];
    description?: string;
    platinum?: boolean;
    certifications?: StrapiBlock[] | unknown;
    ctaButton?: StrapiButtonType;
    affiliateCompany?: {
        id: number;
        documentId?: string;
        title: string;
    };
    users?: {
        id: number;
        username: string;
    };
}

interface StrapiBlock {
    type: string;
    format?: string;
    level?: number;
    children?: StrapiBlock[];
    text?: string;
}