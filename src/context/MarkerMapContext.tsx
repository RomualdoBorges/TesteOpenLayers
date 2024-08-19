import React, { createContext, ReactNode, useCallback } from 'react';
import { Map, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export interface MarkerMapContextType {
  map: Map | null;
  vectorSource: VectorSource | null;
  addMarker: (coordinates: [number, number]) => void;
  clearMarkers: () => void;
}

interface MarkerMapProviderProps {
  map: Map | null;
  vectorSource: VectorSource | null;
  children: ReactNode; // Adicione esta linha
}

const MarkerMapContext = createContext<MarkerMapContextType | undefined>(undefined);

const MarkerMapProvider: React.FC<MarkerMapProviderProps> = ({ children, map, vectorSource }) => {
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

  const clearMarkers = useCallback(() => {
    if (vectorSource) {
      vectorSource.clear();
    }

    if (map) {
      const view = map.getView();
      view.setZoom(14);
    }
  }, [vectorSource, map]);

  return (
    <MarkerMapContext.Provider value={{ map, vectorSource, addMarker, clearMarkers }}>
      {children}
    </MarkerMapContext.Provider>
  );
};

export { MarkerMapContext, MarkerMapProvider };
