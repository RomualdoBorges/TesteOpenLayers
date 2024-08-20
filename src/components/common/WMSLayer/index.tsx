import React, { useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Map as OLMap } from 'ol';
import { unByKey } from 'ol/Observable';
import { MapBrowserEvent } from 'ol';
import { useInventory } from '../../../hooks/useInventory';

interface WMSLayerProps {
  map: OLMap;
  url: string;
  layers: string;
  params?: { [key: string]: string | number | boolean };
  visible?: boolean;
}

const WMSLayer: React.FC<WMSLayerProps> = ({ map, url, layers, params = {}, visible = true }) => {
  const { setOpen, setSetor, setQuadra, setLote } = useInventory();

  useEffect(() => {
    const wmsSource = new TileWMS({
      url,
      params: { LAYERS: layers, TILED: true, ...params },
      serverType: 'geoserver',
      transition: 0,
    });

    const layer = new TileLayer({
      source: wmsSource,
      visible,
    });

    map.addLayer(layer);

    const handleMapClick = (event: MapBrowserEvent<UIEvent>) => {
      if (!layer.getVisible()) {
        return;
      }

      const viewResolution = map.getView().getResolution();
      const url = wmsSource.getFeatureInfoUrl(event.coordinate, viewResolution || 0, map.getView().getProjection(), {
        INFO_FORMAT: 'application/json',
      });

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const id = data.features[0].id;
            const setor = data.features[0].properties.zona;
            const quadra = data.features[0].properties.quadra;
            const lote = data.features[0].properties.lote;

            if (id.includes('ligacoes_custom')) {
              setOpen(true);
              setSetor(setor);
              setQuadra(quadra);
              setLote(lote);
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar dados da camada:', error);
          });
      }
    };

    const clickListenerKey = map.on('singleclick', handleMapClick);

    return () => {
      unByKey(clickListenerKey);
      map.removeLayer(layer);
    };
  }, [map, url, layers, params, visible, setOpen, setSetor, setQuadra, setLote]);

  return null;
};

export default WMSLayer;
