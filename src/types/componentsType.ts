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