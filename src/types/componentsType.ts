export interface HeadingType {
    id: number;
    smallTitle?: string;
    title?: string;
    description?: string;
    alignment?: "left" | "center" | "right";
    imageUrl?: string;
    backgroundImg?: {
        url: string;
        alternativeText?: string;
    };
    button?: StrapiButtonType;
}
export interface DownloadType {
    id: number;
    title?: string;
    buttonText?: string;
    documentUrl?: string;
    cover?: {
        url: string;
        alternativeText?: string;
    };
    target?: string;
}

export interface OptionType {
    id: string;
    label: string;
    value: string;
}

export interface StrapiButtonType {
    id?: string;
    text?: string;
    link?: string;
    target?: string;
}

export interface AffiliateType {
  id: number;
  attributes: {
    title: string;
    logo?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    country: {
      code: string;
      name: string;
    };
    city: string;
    type: "organizacion" | "empresa" | "zonaFranca";
    contactInfo?: {
      id: number;
      name?: string;
      position?: string;
      email?: string;
      website?: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ImageType {
  url?: string;
  alternativeText?: string;
}

export interface SlideData {
  __component?: string;
  title?: string;
  icon?: ImageType;
  content?: HeadingType;
  id?: number;
}

export interface SliderData {
  __component?: string;
  title?: string;
  slides?: SlideData[];
  id?: number;
  icon?: ImageType;
}

export interface IntroData {
  __component?: string;
  icon?: ImageType;
  content?: string
  id?: number;
}

export interface TwoColumnsData {
  __component?: string;
  title?: string;
  content?: string;
  positionContent?: "left" | "right";
  id?: number;
  cover?: ImageType;
  video?: {
    title?: string;
    uploadedVideo?: {
      url: string;
      alternativeText?: string;
    };
    youtubeUrl?: string;
    vimeoUrl?: string;
    thumbnail?: ImageType;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}

export interface ServicesGridData {
  __component?: string;
  title?: string;
  active?: boolean;
  id?: number;
}

export interface IconLinkType {
  __component?: string;
  icon?: {
    type?: string;
    customImage?: ImageType;
    reactIconName?: string;
  }
  label?: string;
  url?: string;
}

export interface HeroSlideData {
  __component?: string;
  title?: string;
  label?: string;
  subtitle?: string;
  backgroundImage?: ImageType;
  button?: StrapiButtonType;
  iconLinks?: IconLinkType[];
  id?: number;
}

export interface VideoType {
  title?: string;
  thumbnail?: string;
  videoType?: "youtube" | "vimeo" | "uploaded";
  youtubeUrl?: string;
  vimeoUrl?: string;
  uploadedVideo?: {
    url: string;
    alternativeText?: string;
  };
}

export interface ServiceData {
  __component?: string;
  title?: string;
  tag?: string;
  coverImage?: ImageType;
  button?: StrapiButtonType;
  id?: number;
}

export interface StatisticsData {
  __component?: string;
  title?: string;
  statistics?: StatisticsItemData[];
  id?: number;
}

export interface StatisticsItemData {
  __component?: string;
  title?: string;
  icon?: {
    type?: string;
    customImage?: ImageType;
    reactIconName?: string;
  };
  value?: string;
  label?: string;
  isActive?: boolean;
  prefix?: string;
  suffix?: string;
  thousandSeparator?: string;
  id?: number;
}

export interface StrapiImageFormat {
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

export interface StrapiImageFormats {
  large?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  thumbnail?: StrapiImageFormat;
}

export interface StrapiImageType {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface NewsCategoryType {
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

export interface NewsType {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  extract: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  externalLink: string | null;
  thumbnail: StrapiImageType;
  category: NewsCategoryType;
}

export interface EventIconType {
  id: number;
  type: string;
  reactIconName: string;
  customImage: StrapiImageType;
}

export interface EventType {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  tag: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  buttonText: string;
  buttonUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  featuredImage: StrapiImageType;
  calendarIcon: EventIconType;
  locationIcon: EventIconType;
  addressIcon: EventIconType;
  SEO: Record<string, unknown> | null;
  localizations: Record<string, unknown>[];
}

export interface StrapiMediaType {
  id: number;
  title: string | null;
  videoType: string;
  youtubeUrl: string | null;
  vimeoUrl: string | null;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
}

export interface TestimonialType {
  id: number;
  documentId: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage: StrapiImageType;
  media: StrapiMediaType;
}

export interface AffiliateLogoType {
  id: number;
  name: string | null;
  url: string | null;
  logo: StrapiImageType;
}

export interface AffiliateSectionType {
  id: number;
  title: string;
  displayType: string;
  logos: AffiliateLogoType[];
}

export interface PartnerLogoType {
  id: number;
  name: string | null;
  url: string | null;
  logo: StrapiImageType;
}

export interface PartnersSectionType {
  id: number;
  title: string;
  displayType: string;
  logos: PartnerLogoType[];
}