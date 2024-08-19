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
  zona: number;
  quadra: number;
  lote: number;
  clientes: Client[];
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

export interface EnderecoResponse {
  type: FeatureCollection;
}

export interface Endereco {
  logradouro: string;
}

export interface GetEnderecosResponse {
  data: Endereco[];
}
