interface Geometry {
  type: string;
  coordinates: number[][][];
}

interface FeatureProperties {
  fid: number;
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
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
  };
  features: Feature[];
}

export interface DmcVrp {
  codigo_nome: string;
}

export interface DmcVrpResponse {
  type: FeatureCollection;
}
