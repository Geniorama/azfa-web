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

