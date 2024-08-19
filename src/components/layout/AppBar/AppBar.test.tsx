import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AppBar from '.';

describe('Componente AppBar', () => {
  it('deve renderizar sem travar', () => {
    const { container } = render(
      <MemoryRouter>
        <AppBar />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('deve ter o estilo boxShadow correto', () => {
    const { container } = render(
      <MemoryRouter>
        <AppBar />
      </MemoryRouter>,
    );
    const appBarElement = container.firstChild;
    expect(appBarElement).toHaveStyle({
      boxShadow: '0px -10px 50px 2px rgba(23, 64, 93, 0.6)',
    });
  });
});
