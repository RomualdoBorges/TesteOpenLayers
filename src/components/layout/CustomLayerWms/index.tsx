import React, { lazy, Suspense, useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Collapse } from '@mui/material';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import CustomAccordion from '../../common/CustomAccordion';
import { sectorsLayers } from './Layers/sectorsLayers';
import { cartographyLayers } from './Layers/cartographyLayers';
import { waterTechnicalLayers } from './Layers/waterTechnicalLayers';
import { thematicLayer } from './Layers/thematicLayer';
import { Layer, CustomLayersWmsProps } from '../../../types';

const WMSLayer = lazy(() => import('../../common/WMSLayer'));

const CustomLayersWms: React.FC<CustomLayersWmsProps> = ({ map }) => {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set<string>());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedLayers, setExpandedLayers] = useState<string[]>([]);

  const handleLayerToggle = (layerId: string, hasChildren: boolean = false) => {
    setActiveLayers((prev) => {
      const newActiveLayers = new Set(prev);

      const toggleLayer = (layerId: string, select: boolean) => {
        if (select) {
          newActiveLayers.add(layerId);
        } else {
          newActiveLayers.delete(layerId);
        }
      };

      // Verifica se o checkbox está sendo desmarcado
      const isDeselecting = newActiveLayers.has(layerId);

      // Alterna o estado do checkbox pai
      toggleLayer(layerId, !isDeselecting);

      // Se o checkbox tem filhos, alterna o estado de todos os filhos
      if (hasChildren) {
        const layer = [...cartographyLayers, ...waterTechnicalLayers, ...thematicLayer].find((l) => l.id === layerId);
        if (layer && layer.children) {
          const toggleChildren = (children: Layer[], select: boolean) => {
            children.forEach((child) => {
              toggleLayer(child.id, select);
              if (child.children) {
                toggleChildren(child.children, select);
              }
            });
          };
          toggleChildren(layer.children, !isDeselecting);
        }
      }

      return newActiveLayers;
    });
  };

  const handleExpandLayer = (layer: string) => {
    setExpandedLayers((prevExpanded) =>
      prevExpanded.includes(layer) ? prevExpanded.filter((l) => l !== layer) : [...prevExpanded, layer],
    );
  };

  const handleSelectAll = (layers: Layer[], select: boolean) => {
    const allLayers = getAllLayers(layers);
    setActiveLayers((prevLayers) => {
      const newActiveLayers = new Set(prevLayers);
      if (select) {
        allLayers.forEach((layer) => newActiveLayers.add(layer));
      } else {
        allLayers.forEach((layer) => newActiveLayers.delete(layer));
      }
      return newActiveLayers;
    });
  };

  const isAllSelected = (layers: Layer[]): boolean => getAllLayers(layers).every((layer) => activeLayers.has(layer));

  const getAllLayers = (layers: Layer[]): string[] => {
    let allLayers: string[] = [];
    layers.forEach((layer) => {
      allLayers.push(layer.id);
      if (layer.children) {
        allLayers = allLayers.concat(getAllLayers(layer.children));
      }
    });
    return allLayers;
  };

  const filteredLayers = (layers: Layer[]): Layer[] => {
    return layers
      .map((layer): Layer | null => {
        if (layer.displayName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return layer;
        }
        if (layer.children) {
          const filteredChildren = filteredLayers(layer.children);
          if (filteredChildren.length > 0) {
            return { ...layer, children: filteredChildren };
          }
        }
        return null;
      })
      .filter((layer): layer is Layer => layer !== null);
  };

  const renderLayerGroup = (groupName: string, layers: Layer[]) => (
    <FormGroup
      key={groupName}
      style={{
        border: `1px solid #DCE1E8`,
        borderRadius: '2px',
        marginBottom: '12px',
        padding: '5px',
      }}
    >
      <Box display="flex" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllSelected(layers)}
              onChange={(e) => handleSelectAll(layers, e.target.checked)}
              name={`checkAll-${groupName}`}
            />
          }
          label={groupName}
          style={{ flexGrow: 1, color: '#5ABEEC' }}
        />
      </Box>
      {filteredLayers(layers).map((layer) => (
        <Box
          key={layer.id}
          sx={{
            marginLeft: '20px',
            padding: '0px',
            backgroundColor: 'transparent',
            borderRadius: '0px',
          }}
        >
          <FormControlLabel
            style={{
              color: '#8194AB',
              fontWeight: layer.children ? 'bold' : 'normal',
            }}
            control={
              <Checkbox
                checked={activeLayers.has(layer.id)}
                onChange={() => handleLayerToggle(layer.id, !!layer.children)}
                name={layer.id}
              />
            }
            label={
              <Box
                display="flex"
                alignItems="center"
                gap={'8px'}
                onClick={() => layer.children && handleExpandLayer(layer.id)}
                sx={{ cursor: layer.children ? 'pointer' : 'default' }}
              >
                {layer.displayName}
                {layer.icon && <>{layer.icon}</>}
              </Box>
            }
          />
          {layer.children && (
            <Collapse in={expandedLayers.includes(layer.id)} timeout="auto">
              <Box sx={{ paddingLeft: '10px', display: 'grid' }}>
                {layer.children.map((child: Layer) => (
                  <FormControlLabel
                    key={child.id}
                    control={
                      <Checkbox
                        checked={activeLayers.has(child.id)}
                        onChange={() => handleLayerToggle(child.id)}
                        name={child.id}
                      />
                    }
                    label={
                      <Box component="span" display="flex" alignItems="center" gap={'8px'}>
                        {child.displayName}
                        {child.icon && <>{child.icon}</>}
                      </Box>
                    }
                    style={{
                      color: '#8194AB',
                      marginLeft: '10px',
                    }}
                  />
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      ))}
    </FormGroup>
  );

  return (
    <>
      <Box position="absolute" top={85} left={16} zIndex={2000}>
        <CustomAccordion
          icon={<LayersOutlinedIcon style={{ color: '#5ABEEC' }} />}
          title={`Camadas (${activeLayers.size})`}
        >
          <TextField
            variant="outlined"
            placeholder="Pesquisar camada"
            fullWidth
            margin="dense"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: '12px' }}
            aria-label="Pesquisa camada"
          />
          {renderLayerGroup('Setores', sectorsLayers)}
          {renderLayerGroup('Cartografia', cartographyLayers)}
          {renderLayerGroup('Cadastro Técnico - Água', waterTechnicalLayers)}
          {renderLayerGroup('Camadas Temática', thematicLayer)}
        </CustomAccordion>
      </Box>
      {/* Renderizar as camadas no mapa */}
      <Suspense fallback={<div>Loading...</div>}>
        {[...sectorsLayers, ...cartographyLayers, ...waterTechnicalLayers, ...thematicLayer].map((layer) =>
          layer.children ? (
            layer.children.map((child) => (
              <WMSLayer
                key={child.id}
                map={map}
                url={child.url}
                layers={child.layer}
                params={child.params}
                visible={activeLayers.has(child.id)}
              />
            ))
          ) : (
            <WMSLayer
              key={layer.id}
              map={map}
              url={layer.url}
              layers={layer.layer}
              params={layer.params}
              visible={activeLayers.has(layer.id)}
            />
          ),
        )}
      </Suspense>
    </>
  );
};

export default CustomLayersWms;
