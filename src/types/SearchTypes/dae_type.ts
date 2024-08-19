interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface Client {
  cod_dae: string;
  logradouro: string;
  numero: string;
}

interface FeatureProperties {
  geometria: string;
  clientes: Client[];
  id: number;
}

interface Feature {
  type: string;
  properties: FeatureProperties;
  geometry: Geometry;
}

interface FeatureCollection {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: Feature[];
}

export interface DaeResponse {
  type: FeatureCollection;
}
