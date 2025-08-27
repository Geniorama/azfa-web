import { HeadingType } from "./componentsType";

interface SectionType {
  id: number;
  title: string;
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