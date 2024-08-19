import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, MockInstance } from 'vitest';
import DaeForm from '.';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { searchDae } from '../../../services/SearchService/searchService';

// Mocking the necessary hooks and services
vi.mock('../../../hooks/useMarkerMap', () => ({
  useMarkerMap: vi.fn(),
}));

vi.mock('../../../services/SearchService/searchService', () => ({
  searchDae: vi.fn(),
}));

describe('Componente DaeForm', () => {
  const mockAddMarker = vi.fn();
  const mockClearMarkers = vi.fn();

  beforeEach(() => {
    (useMarkerMap as unknown as MockInstance).mockReturnValue({
      addMarker: mockAddMarker,
      clearMarkers: mockClearMarkers,
    });

    (searchDae as unknown as MockInstance).mockResolvedValue({
      type: {
        features: [
          {
            geometry: {
              coordinates: [50, 50],
            },
          },
        ],
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o componente DaeForm corretamente', () => {
    render(<DaeForm />);
    expect(screen.getByPlaceholderText('Digite o código DAE')).toBeInTheDocument();
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('deve desabilitar a entrada e mostrar o botão de exclusão quando um marcador é adicionado', async () => {
    render(<DaeForm />);

    const input = screen.getByPlaceholderText('Digite o código DAE');
    const submitButton = screen.getByLabelText('search');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockAddMarker).toHaveBeenCalledWith([50, 50]));

    expect(input).toBeDisabled();
    expect(screen.queryByLabelText('search')).not.toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  it('mensagem de erro quando nenhum dado for encontrado', async () => {
    // Simula a resposta da função searchDae com um array de features vazio
    (searchDae as unknown as MockInstance).mockResolvedValue({
      type: {
        features: [],
      },
    });

    render(<DaeForm />);

    const input = screen.getByPlaceholderText('Digite o código DAE');
    const submitButton = screen.getByLabelText('search');

    // Simula a inserção de um valor no input
    fireEvent.change(input, { target: { value: '123' } });
    // Simula o clique no botão de submit
    fireEvent.click(submitButton);

    // Verifica se a mensagem de erro foi exibida
    await waitFor(() => expect(screen.getByText(/Número não encontrado!/i)).toBeInTheDocument());

    // Verifica se o valor do input foi limpo
    expect(input).toHaveValue('');
  });

  it('deve limpar o marcador e redefinir o formulário quando o botão excluir for clicado', async () => {
    render(<DaeForm />);

    const input = screen.getByPlaceholderText('Digite o código DAE');
    const submitButton = screen.getByLabelText('search');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockAddMarker).toHaveBeenCalledWith([50, 50]));

    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    expect(mockClearMarkers).toHaveBeenCalled();
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue('');
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });
});
