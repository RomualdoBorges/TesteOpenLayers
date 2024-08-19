import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import DrawingControls from '.';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

describe('Componente DrawingControls', () => {
  it('deve alternar a interação de desenho de polígono ao clicar no botão "Poligono"', () => {
    const mockMap = new Map(); // Mock do mapa
    const mockVectorSource = new VectorSource(); // Mock do VectorSource

    const mockAddInteraction = vi.spyOn(mockMap, 'addInteraction'); // Espião na função addInteraction
    const mockRemoveInteraction = vi.spyOn(mockMap, 'removeInteraction'); // Espião na função removeInteraction

    const { getByRole } = render(<DrawingControls map={mockMap} vectorSource={mockVectorSource} />);

    const polygonDrawingButton = getByRole('button', { name: 'Poligono' });

    // Primeiro clique: ativa o desenho de polígono
    fireEvent.click(polygonDrawingButton);
    expect(mockAddInteraction).toHaveBeenCalledTimes(1);

    // Segundo clique: desativa o desenho de polígono
    fireEvent.click(polygonDrawingButton);
    expect(mockRemoveInteraction).toHaveBeenCalledTimes(1);
  });

  it('deve adicionar e remover interação de desenho de linha ao clicar em "Medir"', () => {
    const mockMap = new Map(); // Mock do mapa
    const mockVectorSource = new VectorSource(); // Mock do VectorSource

    const mockAddInteraction = vi.spyOn(mockMap, 'addInteraction'); // Espião na função addInteraction
    const mockRemoveInteraction = vi.spyOn(mockMap, 'removeInteraction'); // Espião na função removeInteraction

    const { getByRole } = render(<DrawingControls map={mockMap} vectorSource={mockVectorSource} />);

    const enableLineDrawingButton = getByRole('button', { name: 'Medir' });

    // Primeiro clique: ativa o desenho de linha
    fireEvent.click(enableLineDrawingButton);
    expect(mockAddInteraction).toHaveBeenCalledTimes(1); // Verifica se a interação foi adicionada

    // Segundo clique: desativa o desenho de linha
    fireEvent.click(enableLineDrawingButton);
    expect(mockRemoveInteraction).toHaveBeenCalledTimes(1); // Verifica se a interação foi removida
  });

  // it('deve limpar os polígonos e linhas desenhadas quando clicar no botão de "Apagar"', async () => {
  //   const mockMap = new Map();
  //   const mockVectorSource = new VectorSource();

  //   const mockClear = vi.spyOn(mockVectorSource, 'clear');

  //   const { getByRole } = render(<DrawingControls map={mockMap} vectorSource={mockVectorSource} />);

  //   // Adiciona um polígono ao vectorSource após a renderização
  //   await act(async () => {
  //     const polygon = new Polygon([
  //       [
  //         [0, 0],
  //         [4, 0],
  //         [4, 4],
  //         [0, 4],
  //         [0, 0],
  //       ],
  //     ]);
  //     const feature = new Feature({ geometry: polygon });
  //     mockVectorSource.addFeature(feature);
  //   });

  //   // Espera até que o botão "Apagar" esteja presente no DOM
  //   const clearDrawingsButton = await waitFor(() => getByRole('button', { name: 'Apagar' }));

  //   // Verifica se o botão está presente no DOM
  //   expect(clearDrawingsButton).toBeInTheDocument();

  //   // Clique no botão "Apagar"
  //   fireEvent.click(clearDrawingsButton);

  //   // Verifica se a função clear foi chamada
  //   expect(mockClear).toHaveBeenCalledTimes(1);
  // });

  it('deve limpar os polígonos e linhas desenhadas quando clicar no botão de "Apagar"', async () => {
    const mockMap = new Map();
    const mockVectorSource = new VectorSource();

    // Espião na função removeFeature do VectorSource
    const mockRemoveFeature = vi.spyOn(mockVectorSource, 'removeFeature');

    const { getByRole } = render(<DrawingControls map={mockMap} vectorSource={mockVectorSource} />);

    // Simula a adição de um polígono ao vectorSource após a renderização
    act(() => {
      const polygon = new Polygon([
        [
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
          [0, 0],
        ],
      ]);
      const feature = new Feature({ geometry: polygon });
      feature.set('userDrawn', true); // Definindo a propriedade 'userDrawn'
      mockVectorSource.addFeature(feature);
    });

    // Verifica se o botão "Apagar" está presente no DOM
    const clearDrawingsButton = getByRole('button', { name: 'Apagar' });
    expect(clearDrawingsButton).toBeInTheDocument();

    // Clique no botão "Apagar"
    fireEvent.click(clearDrawingsButton);

    // Verifica se a função removeFeature foi chamada
    await waitFor(() => {
      expect(mockRemoveFeature).toHaveBeenCalledTimes(1);
    });
  });

  it('deve chamar a função de impressão ao clicar no botão "Imprimir"', () => {
    const mockMap = new Map(); // Mock do mapa
    const mockVectorSource = new VectorSource(); // Mock do VectorSource

    // Mock da função window.print
    const printMock = vi.spyOn(window, 'print').mockImplementation(() => {});

    const { getByRole } = render(<DrawingControls map={mockMap} vectorSource={mockVectorSource} />);

    const printButton = getByRole('button', { name: 'Imprimir' });

    // Simula o clique no botão de impressão
    fireEvent.click(printButton);

    // Verifica se a função window.print foi chamada
    expect(printMock).toHaveBeenCalledTimes(1);

    // Limpa o mock
    printMock.mockRestore();
  });
});
