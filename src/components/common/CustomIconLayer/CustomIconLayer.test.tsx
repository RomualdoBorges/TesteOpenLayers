import { render, screen } from '@testing-library/react';
import CustomIconLayer from '.';

describe('Componente CustomIconLayer', () => {
  it('deve renderizar o ícone correto quando um nome válido é fornecido', () => {
    const name = 'adaptador';
    render(<CustomIconLayer name={name} width={50} height={50} />);

    const imgElement = screen.getByAltText(name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('ADAPTADOR.png'));
    expect(imgElement).toHaveAttribute('width', '50');
    expect(imgElement).toHaveAttribute('height', '50');
  });

  it('deve retornar null e logar no console quando um nome inválido é fornecido', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const name = 'invalido';
    const { container } = render(<CustomIconLayer name={name} />);

    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(`Ícone ${name} não encontrado`);
  });
});
