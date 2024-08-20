import { render, screen } from '@testing-library/react';
import CustomWindow from '.';
import CloseIcon from '@mui/icons-material/Close';

describe('Componente CustomWindow', () => {
  it('deve renderizar com um título e um ícone', () => {
    render(<CustomWindow title="Test Window" icon={<CloseIcon data-testid="CustomIcon" />} />);

    const titleElement = screen.getByText('Test Window');
    const iconElement = screen.getByTestId('CustomIcon');

    expect(titleElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('deveria deixar as crianças dentro da janela', () => {
    render(
      <CustomWindow title="Test Window">
        <div>Child Content</div>
      </CustomWindow>,
    );

    const childElement = screen.getByText('Child Content');
    expect(childElement).toBeInTheDocument();
  });

  it('deve chamar handleWindowClose quando o ícone fechar for clicado', () => {
    const handleClose = vi.fn();
    render(<CustomWindow title="Test Window" handleWindowClose={handleClose} />);

    const closeButton = screen.getByRole('button');
    closeButton.click();

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('não deveria bater sem filhos', () => {
    render(<CustomWindow title="Test Window" />);
    const titleElement = screen.getByText('Test Window');

    expect(titleElement).toBeInTheDocument();
  });
});
