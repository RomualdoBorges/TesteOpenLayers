interface Geometry {
  type: string;
  coordinates: [number, number];
}

interface Client {
  id: number;
  codigo_cliente: string;
  categoria_de_uso: string;
  data_ligacao: string;
}

interface FeatureProperties {
  fid: number;
  informacoes_clientes: Client[];
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

export interface IptuResponse {
  type: FeatureCollection;
}
