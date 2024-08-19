import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomAccordion from '.';
import { describe, it, expect } from 'vitest';

describe('Componente CustomAccordion', () => {
  it('renderiza título e filhos corretamente', () => {
    const title = 'Título do teste';
    const childrenText = 'Este é o conteúdo dentro do acordeão.';

    render(
      <CustomAccordion title={title}>
        <div>{childrenText}</div>
      </CustomAccordion>,
    );

    // Verifica se o título é renderizado corretamente
    expect(screen.getByText(title)).toBeInTheDocument();

    // Simula um clique para expandir o accordion
    userEvent.click(screen.getByRole('button'));

    // Verifica se o conteúdo filho é renderizado após a expansão
    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  it('renderiza com ícone, se fornecido', () => {
    const title = 'Título do teste';
    const iconText = 'Icone';
    const Icon = <div>{iconText}</div>;

    render(
      <CustomAccordion title={title} icon={Icon}>
        <div>Content</div>
      </CustomAccordion>,
    );

    // Verifica se o ícone é renderizado
    expect(screen.getByText(iconText)).toBeInTheDocument();
  });

  it('aplica estilos de barra de rolagem personalizados corretamente', () => {
    const title = 'Título do teste';
    const childrenText = 'Este é o conteúdo dentro do acordeão.';

    render(
      <CustomAccordion title={title}>
        <div style={{ height: '1000px' }}>{childrenText}</div> {/* Conteúdo longo para scrollbar */}
      </CustomAccordion>,
    );

    // Simula um clique para expandir o accordion
    userEvent.click(screen.getByRole('button'));

    // Verifica se o conteúdo longo está renderizado
    expect(screen.getByText(childrenText)).toBeInTheDocument();

    // Verifica se o estilo do container está correto (overflow e maxHeight)
    const detailsElement = screen.getByText(childrenText).parentElement!;
    expect(detailsElement).toHaveStyle('overflow-y: auto');
    expect(detailsElement).toHaveStyle('max-height: 550px');
  });
});
