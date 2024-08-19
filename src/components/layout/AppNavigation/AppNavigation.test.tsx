import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppNavigation from '.';
import { describe, it, expect } from 'vitest';

describe('Componente AppNavigation', () => {
  it('renderiza os links de navegação corretamente', () => {
    render(
      <MemoryRouter>
        <AppNavigation />
      </MemoryRouter>,
    );

    expect(screen.getByText(/mapas/i)).toBeInTheDocument();
    expect(screen.getByText(/indicadores/i)).toBeInTheDocument();
    expect(screen.getByText(/inteligência/i)).toBeInTheDocument();
    expect(screen.getByText(/balanço hídrico/i)).toBeInTheDocument();
    expect(screen.getByText(/relatórios/i)).toBeInTheDocument();
    expect(screen.getByText(/alertas/i)).toBeInTheDocument();
  });

  it('links têm atributos href corretos', () => {
    render(
      <MemoryRouter>
        <AppNavigation />
      </MemoryRouter>,
    );

    expect(screen.getByText(/mapas/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/indicadores/i).closest('a')).toHaveAttribute('href', '/indicadores');
    expect(screen.getByText(/inteligência/i).closest('a')).toHaveAttribute('href', '/inteligencia');
    expect(screen.getByText(/balanço hídrico/i).closest('a')).toHaveAttribute('href', '/balanco');
    expect(screen.getByText(/relatórios/i).closest('a')).toHaveAttribute('href', '/relatorios');
    expect(screen.getByText(/alertas/i).closest('a')).toHaveAttribute('href', '/alertas');
  });

  it('indica a aba selecionada corretamente', () => {
    render(
      <MemoryRouter initialEntries={['/indicadores']}>
        <Routes>
          <Route path="*" element={<AppNavigation />} />
        </Routes>
      </MemoryRouter>,
    );

    const indicadoresTab = screen.getByText(/indicadores/i).closest('li');
    expect(indicadoresTab).toHaveStyle('border-bottom: 5px solid #5ABEEC');
  });
});
