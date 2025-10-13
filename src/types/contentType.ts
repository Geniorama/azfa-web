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

// Tipos para Studies/Publications
export interface StudyTag {
    id: number;
    name: string;
    color: string;
    slug: string | null;
}

export interface StudyImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        small: ImageFormat;
        thumbnail: ImageFormat;
    };
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

export interface StudyDownloadableFile {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: unknown | null;
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

export interface StudyType {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    publishDate: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    author: unknown | null;
    featuredImage: StudyImage;
    downloadableFile: StudyDownloadableFile;
    tags: StudyTag[];
    SEO: unknown | null;
    localizations: unknown[];
}

// Tipo para la respuesta de Strapi para Studies
export interface StudiesResponse {
    data: StudyType[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// Tipos para Management (reutilizando las mismas estructuras que Studies)
export interface ManagementType {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    publishDate: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    author: unknown | null;
    featuredImage: StudyImage;
    downloadableFile: StudyDownloadableFile;
    tags: StudyTag[];
    SEO: unknown | null;
    localizations: unknown[];
}

// Tipo para la respuesta de Strapi para Management
export interface ManagementResponse {
  data: ManagementType[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipos para estadísticas de afiliados (misma estructura que estadísticas de inversión)
export interface AffiliateInvestmentStatisticsType {
  id: number;
  title: string;
  smallTitle: string;
  heroBackground: HeroBackground;
  ctaSection: CTASection;
  iframeCollection: {
    data: IframeCollectionItem[];
  };
  disclaimerText?: string;
}

export interface AffiliateInvestmentStatisticsResponse {
  data: AffiliateInvestmentStatisticsType | null;
  meta: unknown;
}

// Tipos para Oferta Inmobiliaria
export interface CoverImage {
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

export interface LogoImage {
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

export interface LogoItem {
  id: number;
  logo: LogoImage;
  name: string;
  url: string;
}

export interface GalleryComponent {
  id: number;
  title: string;
  logo: LogoItem[];
}

export interface OfertaInmobiliariaType {
  id: number;
  documentId: string;
  title: string;
  smallTitle: string;
  description: string;
  coverImage: CoverImage;
  suppliersLogos: GalleryComponent;
  consultantsLogos: GalleryComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Tipo para la respuesta de Strapi para Oferta Inmobiliaria
export interface OfertaInmobiliariaResponse {
  data: OfertaInmobiliariaType;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipos para Press Room (Blog, News, Podcast, Newsletter)
export interface PressRoomCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PressRoomContentComponent {
  id: number;
  __component: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PressRoomType {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishDate: string | null;
  isPublished: boolean;
  scheduledPublishDate: string | null;
  extract: string;
  type: "news" | "podcast" | "newsletter" | "blog";
  thumbnail: LogoImage;
  category: PressRoomCategory;
  externalLink: string | null;
  downloadDocument: LogoImage | null;
  content: PressRoomContentComponent[];
  SEO: unknown[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// Tipo para la respuesta de Strapi para Press Room
export interface PressRoomResponse {
  data: PressRoomType[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Tipo para la respuesta de un solo Press Room
export interface SinglePressRoomResponse {
  data: PressRoomType[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}