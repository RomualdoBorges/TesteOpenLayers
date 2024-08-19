import React, { useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Map as OLMap } from 'ol';
import { unByKey } from 'ol/Observable';
import { MapBrowserEvent } from 'ol';

interface WMSLayerProps {
  map: OLMap;
  url: string;
  layers: string;
  params?: { [key: string]: string | number | boolean };
  visible?: boolean;
}

const WMSLayer: React.FC<WMSLayerProps> = ({ map, url, layers, params = {}, visible = true }) => {
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
        return; // Ignora o clique se a camada não estiver visível
      }

      const viewResolution = map.getView().getResolution();
      const url = wmsSource.getFeatureInfoUrl(event.coordinate, viewResolution || 0, map.getView().getProjection(), {
        INFO_FORMAT: 'application/json',
      });

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log('Dados da camada:', data);
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
  }, [map, url, layers, params, visible]);

  return null;
};

export default WMSLayer;
