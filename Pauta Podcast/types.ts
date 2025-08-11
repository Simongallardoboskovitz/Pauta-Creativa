export enum DesignSpecialization {
  GRAPHIC = 'Diseño Gráfico',
  INDUSTRIAL = 'Diseño Industrial',
  INTERACTION = 'Diseño de Interacción',
  FASHION = 'Diseño de Indumentaria',
}

export interface PodcastFormInputs {
  specialization: DesignSpecialization;
  hostName: string;
  hostRole: string;
  guestName: string;
  episodeTitle: string;
  guestHit: string;
  section1: string;
  section2: string;
  section3: string;
}