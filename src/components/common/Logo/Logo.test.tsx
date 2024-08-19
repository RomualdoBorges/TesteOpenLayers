import { render, screen } from '@testing-library/react';
import Logo from '.';

describe('Componente Logo', () => {
  it('deve renderizar duas imagens com texto alternativo correto', () => {
    render(<Logo />);

    const logoMonitora = screen.getByAltText('Logo Monitora');
    const logoSaesa = screen.getByAltText('Logo Saesa');

    expect(logoMonitora).toBeInTheDocument();
    expect(logoSaesa).toBeInTheDocument();
  });

  it('deve renderizar um divisor entre as imagens', () => {
    render(<Logo />);

    const dividerElement = screen.getByRole('separator');
    expect(dividerElement).toBeInTheDocument();
  });
});
