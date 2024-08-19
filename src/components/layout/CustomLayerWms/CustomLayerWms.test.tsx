import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomLayersWms from '.';
import { cartographyLayers } from './Layers/cartographyLayers';
import { waterTechnicalLayers } from './Layers/waterTechnicalLayers';
import { thematicLayer } from './Layers/thematicLayer';
import { Map as OLMap } from 'ol'; // ou qualquer outra biblioteca de mapas que você esteja usando
import { vi } from 'vitest';

// Mock the WMSLayer component
vi.mock('../../common/WMSLayer', () => ({
  __esModule: true,
  default: ({ visible }: { visible: boolean }) => (
    <div data-testid="wms-layer" style={{ display: visible ? 'block' : 'none' }} />
  ),
}));

describe('Componente CustomLayersWms', () => {
  const mockMap = new OLMap({});

  it('renderiza os grupos de camadas', () => {
    render(<CustomLayersWms map={mockMap} />);
    expect(screen.getByText('Cartografia')).toBeInTheDocument();
    expect(screen.getByText('Cadastro Técnico - Água')).toBeInTheDocument();
    expect(screen.getByText('Camadas Temática')).toBeInTheDocument();
  });

  it('filtra camadas com base na entrada de pesquisa', async () => {
    render(<CustomLayersWms map={mockMap} />);

    // Encontre o campo de pesquisa e simule a entrada de texto para filtrar as camadas
    const searchInput = screen.getByPlaceholderText('Pesquisar camada');
    fireEvent.change(searchInput, { target: { value: 'Cruzamentos' } });

    // Verifique se as camadas que correspondem ao texto estão presentes
    const expectedLayer = screen.queryByText('Cruzamentos');
    expect(expectedLayer).toBeInTheDocument();

    // Verifique se as camadas que não correspondem ao texto não estão presentes
    const nonExpectedLayer = screen.queryByText('Conexões');
    expect(nonExpectedLayer).not.toBeInTheDocument();
  });

  it('alterna a visibilidade da camada', () => {
    render(<CustomLayersWms map={mockMap} />);

    const layerCheckbox = screen.getByLabelText(cartographyLayers[0].displayName);
    expect(layerCheckbox).not.toBeChecked();

    fireEvent.click(layerCheckbox);
    expect(layerCheckbox).toBeChecked();

    const renderedLayers = screen.getAllByTestId('wms-layer');
    expect(renderedLayers.some((layer) => layer.style.display === 'block')).toBeTruthy();
  });

  it('expande e recolhe grupos de camadas com filhos', () => {
    render(<CustomLayersWms map={mockMap} />);

    const parentLayer = [...cartographyLayers, ...waterTechnicalLayers, ...thematicLayer].find(
      (layer) => layer.children,
    );
    if (!parentLayer) throw new Error('Nenhuma camada pai encontrada nas camadas fornecidas.');

    const parentLayerLabel = screen.getByText(parentLayer.displayName);

    fireEvent.click(parentLayerLabel);

    parentLayer.children!.forEach((childLayer) => {
      const childElements = screen.getAllByText(childLayer.displayName);
      expect(childElements.length).toBeGreaterThan(0);
    });
  });
});
