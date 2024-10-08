import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { Map, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { getVrpOrDmcInfo } from '../utils/getVrpOrDmcInfo';
import WMSLayer from '../components/common/WMSLayer';

export interface MarkerMapContextType {
  map: Map | null;
  vectorSource: VectorSource | null;
  addMarker: (coordinates: [number, number]) => void;
  addDmcVrp: (caseNumber: number) => void;
  clearMarkers: () => void;
  clearLayers: () => void;
}

interface MarkerMapProviderProps {
  map: Map | null;
  vectorSource: VectorSource | null;
  children: ReactNode; // Adicione esta linha
}

const MarkerMapContext = createContext<MarkerMapContextType | undefined>(undefined);

const MarkerMapProvider: React.FC<MarkerMapProviderProps> = ({ children, map, vectorSource }) => {
  const [activeLayers, setActiveLayers] = useState<Array<{ id: number; locationName: string }>>([]);

  const addMarker = useCallback(
    (coordinates: [number, number]) => {
      if (vectorSource && map) {
        const marker = new Feature({
          geometry: new Point(fromLonLat(coordinates)),
        });
        marker.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 8,
              fill: new Fill({ color: 'red' }),
              stroke: new Stroke({
                color: 'white',
                width: 2,
              }),
            }),
          }),
        );

        vectorSource.addFeature(marker);

        const view = map.getView();
        view.setCenter(fromLonLat(coordinates));
        view.setZoom(18);
      }
    },
    [vectorSource, map],
  );

  const addDmcVrp = useCallback((caseNumber: number) => {
    const locationName = getVrpOrDmcInfo(caseNumber);
    setActiveLayers((prev) => [...prev, { id: caseNumber, locationName }]);
  }, []);

  const clearMarkers = useCallback(() => {
    if (vectorSource) {
      vectorSource.clear();
    }

    if (map) {
      const view = map.getView();
      view.setZoom(14);
    }
  }, [vectorSource, map]);

  const clearLayers = useCallback(() => {
    setActiveLayers([]); // Limpa todas as camadas ativas
  }, []);

  return (
    <MarkerMapContext.Provider value={{ map, vectorSource, addMarker, addDmcVrp, clearMarkers, clearLayers }}>
      {children}

      {/* Renderize as camadas WMS com base nas layers ativas */}
      {map &&
        activeLayers.map((layer) => (
          <WMSLayer
            key={`search:${layer.id}`}
            map={map}
            url={'http://localhost:8080/geoserver/agua/wms'}
            layers={'agua:setor_dmc'}
            params={{ CQL_FILTER: `nome='${layer.locationName}'` }}
            visible={true}
          />
        ))}
    </MarkerMapContext.Provider>
  );
};

export { MarkerMapContext, MarkerMapProvider };
