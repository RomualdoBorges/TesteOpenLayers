interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface FeatureProperties {
  id: number;
  setor: string;
  quadra: string;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: FeatureProperties;
}

interface FeatureCollection {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: { name: string };
  };
  features: Feature[];
}

export interface CruzamentoResponse {
  type: FeatureCollection;
}
