import React from 'react';
import { Map } from 'ol';
import DrawingControls from '../../common/DrawingControls';
import ZoomControls from '../../common/ZoomControls';
import VectorSource from 'ol/source/Vector';

interface ToolsMapProps {
  map: Map;
  vectorSource: VectorSource;
}

const ToolsMap: React.FC<ToolsMapProps> = ({ map, vectorSource }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '16px',
        zIndex: 1000,
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ZoomControls map={map} />
      <DrawingControls map={map} vectorSource={vectorSource} />
    </div>
  );
};

export default ToolsMap;
