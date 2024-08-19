import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, MockInstance } from 'vitest';
import IptuForm from '.';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { searchCruzamento, searchIptu } from '../../../services/SearchService/searchService';

// Mocking hooks and services
vi.mock('../../../hooks/useMarkerMap');
vi.mock('../../../services/SearchService/searchService');

describe('Componente IptuForm', () => {
  const addMarker = vi.fn();
  const clearMarkers = vi.fn();

  beforeEach(() => {
    (useMarkerMap as unknown as MockInstance).mockReturnValue({
      addMarker,
      clearMarkers,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar os campos e botões do formulário', () => {
    render(<IptuForm />);

    expect(screen.getByPlaceholderText('Setor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Quadra')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lote')).toBeInTheDocument();
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('deve desativar o botão de pesquisa se os campos não forem preenchidos', () => {
    render(<IptuForm />);

    const searchButton = screen.getByLabelText('search');
    expect(searchButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('Setor'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Quadra'), { target: { value: '456' } });

    expect(searchButton).not.toBeDisabled();
  });

  it('deve adicionar um marcador no envio bem-sucedido', async () => {
    const mockResponse = {
      type: {
        features: [
          {
            geometry: {
              coordinates: [100, 200],
            },
          },
        ],
      },
    };

    (searchCruzamento as unknown as MockInstance).mockResolvedValue(mockResponse);
    (searchIptu as unknown as MockInstance).mockResolvedValue(mockResponse);

    render(<IptuForm />);

    fireEvent.change(screen.getByPlaceholderText('Setor'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Quadra'), { target: { value: '456' } });
    fireEvent.click(screen.getByLabelText('search'));

    await waitFor(() => {
      expect(addMarker).toHaveBeenCalledWith([100, 200]);
    });
  });

  it('deve exibir alerta de erro se nenhum resultado for encontrado', async () => {
    (searchCruzamento as unknown as MockInstance).mockResolvedValue({ type: { features: [] } });
    (searchIptu as unknown as MockInstance).mockResolvedValue({ type: { features: [] } });

    render(<IptuForm />);

    fireEvent.change(screen.getByPlaceholderText('Setor'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Quadra'), { target: { value: '456' } });
    fireEvent.click(screen.getByLabelText('search'));

    await waitFor(() => {
      expect(screen.getByText('Número não encontrado!')).toBeInTheDocument();
    });
  });

  it('deve limpar os marcadores e redefinir o formulário ao clicar no botão Limpar', async () => {
    const mockResponse = {
      type: {
        features: [
          {
            geometry: {
              coordinates: [100, 200],
            },
          },
        ],
      },
    };

    (searchCruzamento as unknown as MockInstance).mockResolvedValue(mockResponse);
    (searchIptu as unknown as MockInstance).mockResolvedValue(mockResponse);

    render(<IptuForm />);

    fireEvent.change(screen.getByPlaceholderText('Setor'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Quadra'), { target: { value: '456' } });
    fireEvent.change(screen.getByPlaceholderText('Lote'), { target: { value: '789' } });
    fireEvent.click(screen.getByLabelText('search'));

    await waitFor(() => {
      expect(addMarker).toHaveBeenCalledWith([100, 200]);
    });

    fireEvent.click(screen.getByLabelText('delete'));

    expect(clearMarkers).toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Setor')).toHaveValue('');
    expect(screen.getByPlaceholderText('Quadra')).toHaveValue('');
    expect(screen.getByPlaceholderText('Lote')).toHaveValue('');
  });
});
