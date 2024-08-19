import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, MockInstance } from 'vitest';
import AddressForm from '.';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { searchEndereco, getEnderecos } from '../../../services/SearchService/searchService';

vi.mock('../../../hooks/useMarkerMap', () => ({
  useMarkerMap: vi.fn(),
}));

vi.mock('../../../services/SearchService/searchService', () => ({
  searchEndereco: vi.fn(),
  getEnderecos: vi.fn(),
}));

describe('Componente AddressForm', () => {
  const addMarkerMock = vi.fn();
  const clearMarkersMock = vi.fn();

  beforeEach(() => {
    (useMarkerMap as unknown as MockInstance).mockReturnValue({
      addMarker: addMarkerMock,
      clearMarkers: clearMarkersMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza o formulário corretamente', () => {
    render(<AddressForm />);
    expect(screen.getByPlaceholderText(/digite o nome da rua/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/número/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('deve buscar endereços ao digitar', async () => {
    const mockOptions = [{ logradouro: 'Rua Teste' }];
    (getEnderecos as unknown as MockInstance).mockResolvedValue(mockOptions);

    render(<AddressForm />);

    const input = screen.getByPlaceholderText(/digite o nome da rua/i);
    fireEvent.change(input, { target: { value: 'Rua' } });

    await waitFor(() => expect(getEnderecos).toHaveBeenCalledWith('Rua'));
    await waitFor(() => {
      expect(screen.getByText('Rua Teste')).toBeInTheDocument();
    });
  });

  it('deve buscar endereços ao digitar', async () => {
    const mockResponse = {
      type: {
        features: [
          {
            geometry: {
              coordinates: [10, 20],
            },
          },
        ],
      },
    };

    (searchEndereco as unknown as MockInstance).mockResolvedValue(mockResponse);

    render(<AddressForm />);

    fireEvent.change(screen.getByPlaceholderText(/digite o nome da rua/i), { target: { value: 'Rua Teste' } });
    fireEvent.change(screen.getByPlaceholderText(/número/i), { target: { value: '123' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(searchEndereco).toHaveBeenCalledWith('Rua Teste', '123');
      expect(addMarkerMock).toHaveBeenCalledWith([10, 20]);
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });
  });

  it('deve limpar os marcadores e redefinir o formulário em claro', async () => {
    const mockResponse = {
      type: {
        features: [
          {
            geometry: {
              coordinates: [10, 20],
            },
          },
        ],
      },
    };

    (searchEndereco as unknown as MockInstance).mockResolvedValue(mockResponse);

    render(<AddressForm />);

    fireEvent.change(screen.getByPlaceholderText(/digite o nome da rua/i), { target: { value: 'Rua Teste' } });
    fireEvent.change(screen.getByPlaceholderText(/número/i), { target: { value: '123' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(searchEndereco).toHaveBeenCalledWith('Rua Teste', '123');
      expect(addMarkerMock).toHaveBeenCalledWith([10, 20]);
    });

    const clearButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(clearMarkersMock).toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/digite o nome da rua/i)).toHaveValue('');
      expect(screen.getByPlaceholderText(/número/i)).toHaveValue('');
    });
  });

  it('deve exibir uma mensagem de erro se a pesquisa falhar', async () => {
    (searchEndereco as unknown as MockInstance).mockRejectedValue(new Error('Search failed'));

    render(<AddressForm />);

    fireEvent.change(screen.getByPlaceholderText(/digite o nome da rua/i), { target: { value: 'Rua Teste' } });
    fireEvent.change(screen.getByPlaceholderText(/número/i), { target: { value: '123' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/número não encontrado/i)).toBeInTheDocument();
    });
  });
});
