import { render, screen, fireEvent } from '@testing-library/react';
import UserMenu from '.';

describe('Componente UserMenu', () => {
  test('deve renderizar UserMenu e alternar opções ao clicar', () => {
    render(<UserMenu />);

    // Verifica se o botão principal está presente
    const mainButton = screen.getByText('André Cury');
    expect(mainButton).toBeInTheDocument();

    // Verifica se o menu não está visível inicialmente
    expect(screen.queryByText('Configurações')).toBeNull();

    // Clica no botão para abrir o menu
    fireEvent.click(mainButton);

    // Verifica se as opções aparecem após o clique
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Acessar TTSQL')).toBeInTheDocument();
    expect(screen.getByText('Encerrar sessão')).toBeInTheDocument();

    // Clica novamente para fechar o menu
    fireEvent.click(mainButton);

    // Verifica se as opções desapareceram após o segundo clique
    expect(screen.queryByText('Configurações')).toBeNull();
  });
});
