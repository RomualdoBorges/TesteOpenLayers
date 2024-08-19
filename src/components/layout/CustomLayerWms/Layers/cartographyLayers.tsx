import { Layer } from '../../../../types';

const urlCartografia = 'http://localhost:8080/geoserver/cartografia/wms';

export const cartographyLayers: Layer[] = [
  {
    id: 'cart_cruzamento',
    name: 'Cruzamentos',
    displayName: 'Cruzamentos',
    url: urlCartografia,
    layer: 'cartografia:cruzamentos',
  },
  {
    id: 'cart_logradouros',
    name: 'Logradouros',
    displayName: 'Logradouros',
    url: urlCartografia,
    layer: 'cartografia:logradouros',
  },
  {
    id: 'cart_lotes',
    name: 'Lotes',
    displayName: 'Lotes',
    url: urlCartografia,
    layer: 'cartografia:lotes',
  },
  {
    id: 'cart_quadras',
    name: 'Quadras',
    displayName: 'Quadras',
    url: urlCartografia,
    layer: 'cartografia:quadras',
  },
  {
    id: 'cart_curvanivel',
    name: 'Curva de Nível',
    displayName: 'Curva de Nível',
    url: urlCartografia,
    layer: 'cartografia:curva_de_nivel',
    icon: (
      <div
        style={{
          height: 3,
          width: 20,
          backgroundColor: '#995050',
        }}
      />
    ),
  },
];
