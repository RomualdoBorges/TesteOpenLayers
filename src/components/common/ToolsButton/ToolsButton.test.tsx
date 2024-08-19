import { render, screen, fireEvent } from '@testing-library/react';
import ToolsButton from '.';
import { describe, it, expect, vi } from 'vitest';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

describe('Componente ToolsButton', () => {
  it('renderiza o botão com o ícone fornecido', () => {
    render(<ToolsButton ariaLabel="tools-button" onClick={() => {}} icon={<DeleteOutlineOutlinedIcon />} />);

    const button = screen.getByRole('button', { name: /tools-button/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument(); // Verifica se o ícone está presente
  });

  it('aplica estilo personalizado passado por props', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <ToolsButton
        ariaLabel="tools-button"
        onClick={() => {}}
        icon={<DeleteOutlineOutlinedIcon />}
        style={customStyle}
      />,
    );

    const button = screen.getByRole('button', { name: /tools-button/i });
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('chama o manipulador onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<ToolsButton ariaLabel="tools-button" onClick={handleClick} icon={<DeleteOutlineOutlinedIcon />} />);

    const button = screen.getByRole('button', { name: /tools-button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica estilos de foco quando hover', () => {
    render(<ToolsButton ariaLabel="tools-button" onClick={() => {}} icon={<DeleteOutlineOutlinedIcon />} />);

    const button = screen.getByRole('button', { name: /tools-button/i });

    fireEvent.mouseOver(button);

    expect(button).toHaveStyle('background-color: #5ABEEC');
    expect(button).toHaveStyle('color: #fff');
  });
});
