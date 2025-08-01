export interface CountryResponse {
  id: string;
  country: string;
  countryImage: {
    url: string;
    alternativeText: string;
  };
  document: {
    id: string;
    document: {
      url: string;
    };
    textButton: string;
  };
  items: {
    headingList: {
      icon: {
        alternativeText: string;
        url: string;
      };
      title: string;
    };
    items?: {
      id: string;
      text: string;
      link: string;
    }[];
  }[];
}