import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import { getLength } from 'ol/sphere';
import Geometry from 'ol/geom/Geometry';
import Polygon from 'ol/geom/Polygon';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToolsButton from '../ToolsButton';

interface DrawingControlsProps {
  map: Map;
  vectorSource: VectorSource;
}

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
});

const ButtonWrapper = styled('div')({
  backgroundColor: '#fff',
  padding: '10px 10px 10px 0',
  boxShadow: '10px 15px 40px -10px rgba(23, 64, 93, 0.4)',
});

const MeasureButtonWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '10px',
  boxShadow: '10px 15px 40px -10px rgba(23, 64, 93, 0.4)',
});

const MeasureTypograph = styled(Typography)({
  backgroundColor: '#5ABEEC',
  padding: '12px',
  color: '#fff',
});

const DrawingControls: React.FC<DrawingControlsProps> = ({ map, vectorSource }) => {
  const [hasPolygonDrawings, setHasPolygonDrawings] = useState(false);
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [lineDistance, setLineDistance] = useState<string>('0,00m');
  const [isLineDrawn, setIsLineDrawn] = useState(false);
  const [isMeasuringLine, setIsMeasuringLine] = useState(false);
  const drawInteractionRef = useRef<Draw | null>(null);

  useEffect(() => {
    const handleChange = () => {
      const polygonExists = vectorSource.getFeatures().some((feature) => {
        return feature.getGeometry() instanceof Polygon;
      });
      setHasPolygonDrawings(polygonExists);
    };

    vectorSource.on('addfeature', handleChange);
    vectorSource.on('removefeature', handleChange);
    return () => {
      vectorSource.un('addfeature', handleChange);
      vectorSource.un('removefeature', handleChange);
    };
  }, [vectorSource]);

  const togglePolygonDrawing = () => {
    if (isDrawingPolygon) {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }
      setIsDrawingPolygon(false);
    } else {
      const draw = new Draw({
        source: vectorSource,
        type: 'Polygon',
      });

      draw.on('drawend', (event) => {
        const geometry: Geometry | undefined = event.feature.getGeometry();

        if (geometry && geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates();
          console.log('Coordenadas do polígono:', coordinates);

          // Atribuindo uma propriedade personalizada à feature desenhada
          event.feature.set('userDrawn', true);
        } else {
          console.error('Erro: geometria não definida ou não é um polígono.');
        }

        map.removeInteraction(draw);
        setIsDrawingPolygon(false);
      });

      map.addInteraction(draw);
      drawInteractionRef.current = draw;
      setIsDrawingPolygon(true);
    }
  };

  const enableLineDrawing = () => {
    if (isMeasuringLine) {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }
      setIsMeasuringLine(false);
    } else {
      const draw = new Draw({
        source: vectorSource,
        type: 'LineString',
      });

      draw.on('drawend', (event) => {
        const geometry: Geometry | undefined = event.feature.getGeometry();

        if (geometry) {
          const length = getLength(geometry) / 1000;
          setLineDistance(`${length.toFixed(2)} Km`);
          setIsLineDrawn(true); // Exibir Typography e botão de apagar

          // Atribuindo uma propriedade personalizada à feature desenhada
          event.feature.set('userDrawn', true);
        } else {
          console.error('Erro: geometria não definida.');
        }

        map.removeInteraction(draw);
        setIsMeasuringLine(false);
      });

      map.addInteraction(draw);
      drawInteractionRef.current = draw;
      setIsMeasuringLine(true);
    }
  };

  const clearDrawings = () => {
    // Filtra as features que possuem a propriedade 'userDrawn'
    vectorSource.getFeatures().forEach((feature) => {
      if (feature.get('userDrawn')) {
        vectorSource.removeFeature(feature);
      }
    });
    setIsLineDrawn(false);
    setHasPolygonDrawings(false);
    setLineDistance('0,00m');
  };

  const printMap = () => {
    window.print();
  };

  return (
    <Container>
      <ButtonWrapper>
        {hasPolygonDrawings ? (
          <ToolsButton
            ariaLabel="Apagar"
            icon={<DeleteOutlineOutlinedIcon sx={{ color: '#FF6347' }} />}
            onClick={clearDrawings}
          />
        ) : (
          <ToolsButton
            ariaLabel="Poligono"
            icon={<FilterHdrIcon sx={{ color: isDrawingPolygon ? '#FF6347' : '#5ABEEC' }} />}
            onClick={togglePolygonDrawing}
          />
        )}
        <ToolsButton
          ariaLabel="Imprimir"
          icon={<LocalPrintshopOutlinedIcon sx={{ color: '#5ABEEC' }} />}
          onClick={printMap}
        />
      </ButtonWrapper>
      <MeasureButtonWrapper>
        <ToolsButton
          ariaLabel="Medir"
          icon={
            <StraightenOutlinedIcon sx={{ color: isMeasuringLine ? '#FF6347' : isLineDrawn ? '#fff' : '#5ABEEC' }} />
          }
          onClick={enableLineDrawing}
          style={{ backgroundColor: isLineDrawn ? '#5ABEEC' : '' }}
        />

        {isLineDrawn && (
          <>
            <MeasureTypograph>{lineDistance}</MeasureTypograph>
            <ToolsButton
              ariaLabel="Apagar"
              icon={<DeleteOutlineOutlinedIcon sx={{ color: '#fff' }} />}
              onClick={clearDrawings}
              style={{ backgroundColor: isLineDrawn ? '#5ABEEC' : '' }}
            />
          </>
        )}
      </MeasureButtonWrapper>
    </Container>
  );
};

export default DrawingControls;
