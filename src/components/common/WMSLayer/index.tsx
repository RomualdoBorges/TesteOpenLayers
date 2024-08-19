import React, { useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Map as OLMap } from 'ol';

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
      params: { LAYERS: layers, ...params },
      serverType: 'geoserver',
      transition: 0,
    });

    const layer = new TileLayer({
      source: wmsSource,
      visible,
    });

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, url, layers, params, visible]);

  return null;
};

export default WMSLayer;
