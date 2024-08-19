import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';
import ToolsButton from '../ToolsButton';

interface ZoomControlsProps {
  map: Map;
}

const Container = styled('div')({
  backgroundColor: '#fff',
  padding: '10px 0 10px 10px',
  boxShadow: '10px 15px 40px -10px rgba(23, 64, 93, 0.4)',
});

const ZoomControls: React.FC<ZoomControlsProps> = ({ map }) => {
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    setView(map.getView());
  }, [map]);

  const handleZoomIn = () => {
    if (view) {
      const zoom = view.getZoom();
      if (zoom !== undefined) {
        view.setZoom(zoom + 1);
      }
    }
  };

  const handleZoomOut = () => {
    if (view) {
      const zoom = view.getZoom();
      if (zoom !== undefined) {
        view.setZoom(zoom - 1);
      }
    }
  };

  return (
    <Container>
      <ToolsButton ariaLabel="Zoom In" icon={<AddIcon sx={{ color: '#5ABEEC' }} />} onClick={handleZoomIn} />
      <ToolsButton ariaLabel="Zoom Out" icon={<RemoveIcon sx={{ color: '#5ABEEC' }} />} onClick={handleZoomOut} />
    </Container>
  );
};

export default ZoomControls;
