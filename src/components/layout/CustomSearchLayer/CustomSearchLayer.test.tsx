import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CustomSearchLayer from '.';

// Mock dos formulários importados
vi.mock('../../form/AddressForm', () => ({
  default: () => <div>AddressForm Mock</div>,
}));
vi.mock('../../form/DaeForm', () => ({
  default: () => <div>DaeForm Mock</div>,
}));
vi.mock('../../form/HydrometerForm', () => ({
  default: () => <div>HydrometerForm Mock</div>,
}));
vi.mock('../../form/IptuForm', () => ({
  default: () => <div>IptuForm Mock</div>,
}));
vi.mock('../../form/DmcVrpForm', () => ({
  default: () => <div>DmcVrpForm Mock</div>,
}));

describe('Componente CustomSearchLayer', () => {
  test('deve renderizar o formulário selecionado padrão (AddressForm)', () => {
    render(<CustomSearchLayer />);

    // Verifica se o AddressForm é renderizado por padrão
    expect(screen.getByText('AddressForm Mock')).toBeInTheDocument();
  });

  test('deve abrir o menu suspenso e selecionar uma opção', () => {
    render(<CustomSearchLayer />);

    // Abre o menu de opções
    fireEvent.click(screen.getByText('Pesquisar por'));

    // Verifica se as opções são renderizadas
    const options = screen.getAllByText('endereço');
    expect(options[0]).toBeInTheDocument();
    expect(screen.getByText('código DAE')).toBeInTheDocument();
    expect(screen.getByText('hidrômetro')).toBeInTheDocument();
    expect(screen.getByText('IPTU')).toBeInTheDocument();
    expect(screen.getByText('DMC/VRP')).toBeInTheDocument();

    // Seleciona uma opção diferente (ex: 'IPTU')
    fireEvent.click(screen.getByText('IPTU'));

    // Verifica se o formulário IPTU é renderizado
    expect(screen.getByText('IptuForm Mock')).toBeInTheDocument();
  });

  test('deve fechar o menu suspenso após selecionar uma opção', () => {
    render(<CustomSearchLayer />);

    // Abre o menu de opções
    fireEvent.click(screen.getByText('Pesquisar por'));

    // Seleciona uma opção (ex: 'hidrômetro')
    fireEvent.click(screen.getByText('hidrômetro'));

    // Verifica se o formulário Hidrômetro é renderizado
    expect(screen.getByText('HydrometerForm Mock')).toBeInTheDocument();

    // Verifica se o menu dropdown foi fechado
    expect(screen.queryByText('endereço')).not.toBeInTheDocument();
  });
});
