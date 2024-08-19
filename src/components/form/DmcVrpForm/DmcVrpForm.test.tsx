import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DmcVrpForm from '.'; // Ajuste o caminho conforme necessário
import { MockInstance, vi } from 'vitest';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { getDmcVrp, searchDmcVrp } from '../../../services/SearchService/searchService';

vi.mock('../../../hooks/useMarkerMap');
vi.mock('../../../services/SearchService/searchService');

describe('Componente DmcVrpForm', () => {
  const addDmcVrpMock = vi.fn();
  const clearLayersMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useMarkerMap as unknown as MockInstance).mockReturnValue({
      clearLayers: clearLayersMock,
      addDmcVrp: addDmcVrpMock,
    });
  });

  it('renderiza o formulário e trata a pesquisa corretamente', async () => {
    const mockDmcVrp = [{ codigo_nome: 'DMC001' }];
    (getDmcVrp as unknown as MockInstance).mockResolvedValue(mockDmcVrp);

    const mockSearchResponse = {
      type: {
        features: [
          {
            properties: { fid: '123' },
          },
        ],
      },
    };
    (searchDmcVrp as unknown as MockInstance).mockResolvedValue(mockSearchResponse);

    render(<DmcVrpForm />);

    const input = screen.getByPlaceholderText('Digite o número ou nome da DMC/VPR');
    const searchButton = screen.getByLabelText('search');

    // Simula a digitação de um valor no campo de pesquisa
    fireEvent.change(input, { target: { value: 'DMC001' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchDmcVrp).toHaveBeenCalledWith('DMC001');
      expect(addDmcVrpMock).toHaveBeenCalledWith('123');
    });
  });

  it('lida com erros de pesquisa corretamente', async () => {
    (searchDmcVrp as unknown as MockInstance).mockRejectedValue(new Error('Not found'));

    render(<DmcVrpForm />);

    const input = screen.getByPlaceholderText('Digite o número ou nome da DMC/VPR');
    const searchButton = screen.getByLabelText('search');

    fireEvent.change(input, { target: { value: 'DMC001' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Número não encontrado!')).toBeInTheDocument();
    });
  });

  it('limpa camadas e redefine o formulário ao clicar no botão Limpar', async () => {
    const mockDmcVrp = [{ codigo_nome: 'DMC001' }];
    (getDmcVrp as unknown as MockInstance).mockResolvedValue(mockDmcVrp);

    const mockSearchResponse = {
      type: {
        features: [
          {
            properties: { fid: '123' },
          },
        ],
      },
    };
    (searchDmcVrp as unknown as MockInstance).mockResolvedValue(mockSearchResponse);

    render(<DmcVrpForm />);

    const input = screen.getByPlaceholderText('Digite o número ou nome da DMC/VPR');
    const searchButton = screen.getByLabelText('search');

    fireEvent.change(input, { target: { value: 'DMC001' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(addDmcVrpMock).toHaveBeenCalledWith('123');
    });

    const clearButton = screen.getByLabelText('delete');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(clearLayersMock).toHaveBeenCalled();
      expect(screen.getByPlaceholderText('Digite o número ou nome da DMC/VPR')).toHaveValue('');
    });
  });
});
