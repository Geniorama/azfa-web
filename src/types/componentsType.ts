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

export interface HeaderTypeData {
    id: number;
    logoUrl: string;
    languageSelector: boolean;
    logo: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: StrapiImageFormats | null;
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
    };
    availableLanguages: {
      id?: number;
      label?: string;
      value?: string;
    }[];
    mainMenu: {
      id?: number;
      label?: string;
      url?: string;
      openInNewTab?: boolean;
      isActive?: boolean;
      icon?: {
        type?: string;
        customImage?: ImageType;
        reactIconName?: string;
      };
      submenu?: {
        id?: number;
        label?: string;
        url?: string;
        openInNewTab?: boolean;
      }[];
    }[];
    topButtons: {
      id?: number;
      label?: string;
      url?: string;
      openInNewTab?: boolean;
      isActive?: boolean;
    }[];
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

export interface GlobalSettingsType {
  id: number;
  title: string;
  description: string;
  logo: StrapiImageType;
}

export interface SocialMediaItemType {
  id: number;
  platform: string;
  url: string;
  openInNewTab: boolean;
  icon: {
    id: number;
    type: string;
    reactIconName: string | null;
    customImage: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: StrapiImageFormats | null;
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
    };
  };
}

export interface FooterLinkType {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
}

export interface FooterLinksColumnType {
  id: number;
  title: string;
  links: FooterLinkType[];
}

export interface ContactInfoType {
  id: number;
  email: string | null;
  website: string | null;
  phone: string | null;
  address: string | null;
  addressIcon: {
    id: number;
    type: string;
    reactIconName: string | null;
    customImage: StrapiImageType;
  } | null;
  emailIcon: {
    id: number;
    type: string;
    reactIconName: string | null;
    customImage: StrapiImageType;
  } | null;
  phoneIcon: {
    id: number;
    type: string;
    reactIconName: string | null;
    customImage: StrapiImageType;
  } | null;
}

export interface FooterCopyrightType {
  id: number;
  text: string;
  developedByText: string;
  developedByLink: {
    id: number;
    label: string;
    url: string;
    openInNewTab: boolean;
  };
  legalLinks: FooterLinkType[];
}

export interface FooterType {
  id: number;
  showSocialLinks: boolean;
  copyright: FooterCopyrightType;
  footerLinksColumns: FooterLinksColumnType[];
  contactInfo: {
    id: number;
    logo?: StrapiImageType;
    ctaText?: string;
    showContactInfo?: boolean;
  };
  socialMedia: SocialMediaItemType[];
  contactInfoGlobal: ContactInfoType;
}

export interface BlogPageType {
  id: number;
  smallTitle: string | null;
  title: string;
  description: string;
  alignment: "left" | "center" | "right";
  backgroundImg: StrapiImageType;
}

export interface NewsletterSectionType {
  id: number;
  smallTitle: string | null;
  title: string;
  description: string;
  alignment: "left" | "center" | "right";
  backgroundImg: StrapiImageType;
}

export interface PodcastSectionType {
  id: number;
  smallTitle: string | null;
  title: string;
  description: string;
  alignment: "left" | "center" | "right";
  backgroundImg: StrapiImageType;
}

export interface NewsSectionType {
  id: number;
  smallTitle: string | null;
  title: string;
  description: string;
  alignment: "left" | "center" | "right";
  backgroundImg: StrapiImageType;
}

export interface PressRoomPageType {
  id: number;
  blogSection?: BlogPageType | null;
  newsletterSection?: NewsletterSectionType | null;
  podcastSection?: PodcastSectionType | null;
  newsSection?: NewsSectionType | null;
}

export interface EventsPageType {
  id: number;
  documentId: string;
  headingSection: {
    id: number;
    smallTitle: string | null;
    title: string;
    description: string;
    alignment: "left" | "center" | "right";
    backgroundImg: StrapiImageType;
  };
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactPageType {
  id: number;
  documentId: string;
  slug: string;
  contactSectionTitle: string;
  hero: {
    id: number;
    smallTitle: string | null;
    title: string;
    description: string | null;
    alignment: "left" | "center" | "right" | null;
    backgroundImg: StrapiImageType;
  };
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TradeZonesPageType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headingSection: {
    id: number;
    smallTitle: string | null;
    title: string;
    description: string | null;
    alignment: string | null;
    backgroundImg: StrapiImageType;
  };
  about: {
    id: number;
    title: string;
    description: string;
    style: string;
    orderReverse: boolean;
    coverImage: StrapiImageType;
  };
  statistics: {
    id: number;
    title: string;
    statistics: {
      id: number;
      documentId: string;
      value: string;
      label: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      prefix: string | null;
      sufix: string | null;
      thousandsSeparator: string | null;
    }[];
  };
  about2: {
    id: number;
    title: string;
    description: string;
    style: string;
    orderReverse: boolean;
    coverImage: StrapiImageType;
  };
  benefits: {
    id: number;
    title: string;
    description: string;
    style: string;
    orderReverse: boolean;
    coverImage: StrapiImageType;
  };
}

export interface ServicesPageType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headingSection: {
    id: number;
    smallTitle: string | null;
    title: string;
    description: string | null;
    alignment: "left" | "center" | "right";
    backgroundImg: StrapiImageType;
  };
  intro: {
    id: number;
    content: string;
    icon: StrapiImageType;
  }[];
  contentSection: {
    id: number;
    title: string;
    description: string;
    style: string;
    orderReverse: boolean;
    coverImage: StrapiImageType;
    button: StrapiButtonType;
  }[];
}