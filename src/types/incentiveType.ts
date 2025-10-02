export interface IncentiveListItem {
  id: number;
  label: string; // En Strapi se llama 'label', no 'name'
  content: string; // Cambiado de 'value' a 'content' y ahora es Markdown
}

export interface GoogleMapsLocation {
  id: number;
  latitude: number; // Strapi usa 'latitude' en lugar de 'lat'
  longitude: number; // Strapi usa 'longitude' en lugar de 'lng'
  label?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface Incentive {
  id: number;
  documentId: string;
  country: string; // Código del país del plugin country-select
  freeZones: number;
  companies: number;
  directJobs: number;
  flag?: {
    id: number;
    url: string;
    alternativeText?: string;
    caption?: string;
  };
  googleMapsLocation?: GoogleMapsLocation;
  incentivesListItem: IncentiveListItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IncentiveResponse {
  data: Incentive[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  success: boolean;
}

// Tipo para el marker del mapa que incluye datos de incentivos
export interface IncentiveMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  imgFlag?: string;
  numberZones: number;
  numberCompanies: number;
  directJobs: number;
  list: {
    label: string; // Cambiado de 'name' a 'label' para coincidir con Strapi
    content: string; // Cambiado de 'value' a 'content' para Markdown
  }[];
}
