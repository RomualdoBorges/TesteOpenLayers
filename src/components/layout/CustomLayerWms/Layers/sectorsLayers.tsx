import { Layer } from '../../../../types';

const urlAgua = 'http://localhost:8080/geoserver/agua/wms';

export const sectorsLayers: Layer[] = [
  {
    id: 'agua_setor_dmc',
    name: 'agua:setor_dmc',
    displayName: 'Setor de Abastecimento',
    url: urlAgua,
    layer: 'agua:setor_dmc',
  },
  {
    id: 'agua_setor_reservatorio',
    name: 'agua:setor_reservatorio',
    displayName: 'Setor de Reservatórios',
    url: urlAgua,
    layer: 'agua:setor_reservatorio',
  },
];
