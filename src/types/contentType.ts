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

// Tipos para Investment Statistics
export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

export interface ImageFormats {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
}

export interface HeroBackground {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface CTAButton {
    id: number;
    label: string;
    url: string;
}

export interface CTASection {
    id: number;
    title: string;
    description: string;
    button: CTAButton;
}

export interface DesktopIframe {
    id: number;
    title: string;
    src: string | null;
    bottomText: string;
}

export interface IframeCollectionItem {
    id: number;
    label: string;
    slug: string;
    desktopIframe: DesktopIframe;
}

export interface InvestmentStatisticsType {
    id: number;
    documentId: string;
    title: string;
    subtitle: string;
    disclaimerText: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slug: string;
    heroBackground: HeroBackground;
    ctaSection: CTASection;
    iframeCollection: IframeCollectionItem[];
}

// Tipo para la respuesta de Strapi para Investment Statistics
export interface InvestmentStatisticsResponse {
    data: InvestmentStatisticsType;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}