import React from 'react';
import adaptador from '../../../assets/layers/ADAPTADOR.png';
import cap from '../../../assets/layers/CAP.png';
import cruzeta from '../../../assets/layers/CRUZETA.png';
import curva_11_15 from '../../../assets/layers/CURVA_11_15.png';
import curva_22_30 from '../../../assets/layers/CURVA_22_30.png';
import curva_45 from '../../../assets/layers/CURVA_45.png';
import curva_90 from '../../../assets/layers/CURVA_90.png';
import juncao from '../../../assets/layers/JUNCAO_EM_Y.png';
import luva from '../../../assets/layers/LUVA.png';
import reducao from '../../../assets/layers/REDUCAO.png';
import te from '../../../assets/layers/TE.png';
import valvula_gaveta from '../../../assets/layers/VALVULA_GAVETA.png';
import ligacoes_multiplos_clientes from '../../../assets/layers/LIGACOES_MULTIPLOS_CLIENTES.png';

interface CustomIconLayerProps {
  name: string;
  width?: number | string;
  height?: number | string;
}

const CustomIconLayer: React.FC<CustomIconLayerProps> = ({ name, width, height }) => {
  const icons: { [key: string]: string } = {
    adaptador,
    cruzeta,
    cap,
    curva_11_15,
    curva_22_30,
    curva_45,
    curva_90,
    juncao,
    luva,
    reducao,
    te,
    valvula_gaveta,
    ligacoes_multiplos_clientes,
  };

  const iconSrc = icons[name];

  if (!iconSrc) {
    console.log(`Ícone ${name} não encontrado`);
    return null;
  }

  return (
    <>
      <img src={iconSrc} alt={name} width={width} height={height} />
    </>
  );
};

export default CustomIconLayer;
