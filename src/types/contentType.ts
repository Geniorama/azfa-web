import { HeadingType } from "./componentsType";

interface SectionType {
  id: number;
  title: string;
  __component?: string;
  images: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
}

export interface ContentType {
    id: number;
    slug: string;
    title?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    documentId: string;
    heading?: HeadingType;
    sections?: SectionType[];
}

// Tipo para la respuesta de Strapi para contenidos
export interface ContentResponse {
    data: ContentType[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}