import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, get as getProjection } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import ToolsMap from '../../layout/ToolsMap';
import { XYZ } from 'ol/source';
import CustomLayersWms from '../../layout/CustomLayerWms';
import CustomSearchLayer from '../../layout/CustomSearchLayer';
import { MarkerMapProvider } from '../../../context/MarkerMapContext';
import { InventoryProvider } from '../../../context/InventoryContext';
import InventoryWindow from '../../layout/InventoryWindow';

const CustomMap: React.FC = () => {
  const [map, setMap] = useState<Map | null>(null);
  const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);

  useEffect(() => {
    const SCdoSul = [-46.567, -23.6224];

    const projection = getProjection('EPSG:3857');

    if (projection) {
      const source = new VectorSource();
      setVectorSource(source);

      const vectorLayer = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(90, 190, 236, 0.5)',
          }),
          stroke: new Stroke({
            color: 'rgba(90, 190, 236, 1)',
            width: 4,
          }),
        }),
      });

      // Inicializa o mapa
      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
              attributions: '&copy; <a href="https://carto.com/">CartoDB</a>',
              maxZoom: 20,
              crossOrigin: 'anonymous',
            }),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat(SCdoSul),
          zoom: 14,
          maxZoom: 20,
        }),
      });

      // Define o extent máximo e reposiciona se sair
      newMap.getView().on('change:center', () => {
        const view = newMap.getView();
        const center = view.getCenter();
        if (center && !view.getConstrainResolution()) {
          view.setConstrainResolution(true);
        }
      });

      setMap(newMap);

      return () => {
        newMap.setTarget(undefined);
      };
    } else {
      console.error('Projeção EPSG:3857 não encontrada.');
    }
  }, []);

  return (
    <InventoryProvider>
      <MarkerMapProvider map={map} vectorSource={vectorSource}>
        <div>
          <div id="map" style={{ width: '100%', height: '100vh' }}></div>
          {map && vectorSource && <ToolsMap map={map} vectorSource={vectorSource} />}
          {map && <CustomLayersWms map={map} />}
          {map && <CustomSearchLayer />}
          {map && <InventoryWindow />}
        </div>
      </MarkerMapProvider>
    </InventoryProvider>
  );
};

export default CustomMap;
