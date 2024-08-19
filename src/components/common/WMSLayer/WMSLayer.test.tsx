import { vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Map as OLMap } from 'ol';
import WMSLayer from '.';

vi.mock('ol/layer/Tile', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      setVisible: vi.fn(),
    })),
  };
});

vi.mock('ol/source/TileWMS', () => {
  return {
    default: vi.fn().mockImplementation(() => ({})),
  };
});

describe('Componente WMSLayer', () => {
  let map: OLMap;

  beforeEach(() => {
    map = new OLMap({
      target: document.createElement('div'),
    });

    map.addLayer = vi.fn();
    map.removeLayer = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('deve adicionar a camada WMS ao mapa', () => {
    render(<WMSLayer map={map} url="http://example.com/wms" layers="exampleLayer" />);

    expect(TileLayer).toHaveBeenCalled();
    expect(TileWMS).toHaveBeenCalledWith({
      url: 'http://example.com/wms',
      params: { LAYERS: 'exampleLayer' },
      serverType: 'geoserver',
      transition: 0,
    });
    expect(map.addLayer).toHaveBeenCalled();
  });

  it('deve remover a camada WMS do mapa ao desmontar', () => {
    const { unmount } = render(<WMSLayer map={map} url="http://example.com/wms" layers="exampleLayer" />);

    unmount();

    expect(map.removeLayer).toHaveBeenCalled();
  });
});
