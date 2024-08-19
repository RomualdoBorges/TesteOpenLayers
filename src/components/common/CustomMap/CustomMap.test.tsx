import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomMap from '.';

describe('Componente CustomMap', () => {
  it('renderiza sem travar e contém o div do mapa', () => {
    // Renderiza o componente
    const { container } = render(<CustomMap />);

    // Verifica se o componente foi renderizado corretamente
    const mapDiv = container.querySelector('#map');
    expect(mapDiv).toBeInTheDocument();

    // Verifica se a div possui o estilo correto para ocupar 100% da largura e altura
    expect(mapDiv).toHaveStyle('width: 100%');
    expect(mapDiv).toHaveStyle('height: 100vh');
  });
});
