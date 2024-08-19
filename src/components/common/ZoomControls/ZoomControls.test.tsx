import { fireEvent, render } from '@testing-library/react';
import { Map, View } from 'ol';
import { beforeEach, describe, it, expect } from 'vitest';
import ZoomControls from '.';

describe('Componente ZoomControls', () => {
  let mapMock: Map;
  let viewMock: View;

  beforeEach(() => {
    viewMock = {
      getZoom: vi.fn().mockReturnValue(5),
      setZoom: vi.fn(),
    } as unknown as View;

    mapMock = {
      getView: vi.fn().mockReturnValue(viewMock),
    } as unknown as Map;
  });

  it('deve montar o componente ZoomControls', () => {
    const { getByRole } = render(<ZoomControls map={mapMock} />);
    expect(getByRole('button', { name: 'Zoom In' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Zoom Out' })).toBeInTheDocument();
  });

  it('deve aumentar o zoom quando o botão "+" for clicado', () => {
    const { getByRole } = render(<ZoomControls map={mapMock} />);
    const zoomInButton = getByRole('button', { name: 'Zoom In' });

    fireEvent.click(zoomInButton);

    // Verifica se o getZoom foi chamado uma vez e o valor retornado é 5
    expect(viewMock.getZoom).toHaveBeenCalledTimes(1);
    expect(viewMock.getZoom).toHaveReturnedWith(5);

    // Verifica se o setZoom foi chamado com o valor correto
    expect(viewMock.setZoom).toHaveBeenCalledWith(6);
  });

  it('deve aumentar o zoom quando o botão "-" for clicado', () => {
    const { getByRole } = render(<ZoomControls map={mapMock} />);
    const zoomOutButton = getByRole('button', { name: 'Zoom Out' });

    fireEvent.click(zoomOutButton);

    // Verifica se o getZoom foi chamado uma vez e o valor retornado é 5
    expect(viewMock.getZoom).toHaveBeenCalledTimes(1);
    expect(viewMock.getZoom).toHaveReturnedWith(5);

    // Verifica se o setZoom foi chamado com o valor correto
    expect(viewMock.setZoom).toHaveBeenCalledWith(4);
    expect(true).toBe(true);
  });
});
