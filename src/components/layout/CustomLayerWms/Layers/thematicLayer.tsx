import { Layer } from '../../../../types';

export const thematicLayer: Layer[] = [
  {
    id: 'tematica_ligacoes',
    name: 'Ligações',
    displayName: 'Ligações',
    url: 'http://localhost:8080/geoserver/tematica/wms',
    layer: 'tematica:ligacoes',
  },
  {
    id: 'tematica_servicos',
    name: 'Serviços',
    displayName: 'Serviços',
    url: 'http://localhost:8080/geoserver/tematica/wms',
    layer: 'tematica:servicos',
  },
];
