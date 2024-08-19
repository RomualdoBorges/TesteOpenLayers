import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaginaPadrao from '.';

describe('PaginaPadrao', () => {
  it('deve renderizar o AppBar e o Outlet', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PaginaPadrao />
      </MemoryRouter>,
    );

    // Verifica se o AppBar está presente
    expect(getByRole('banner')).toBeInTheDocument();

    // Como o Outlet é um espaço para outros componentes, não há um teste direto para ele
    // Mas você pode verificar se o main está presente
    expect(getByRole('main')).toBeInTheDocument();
  });
});
