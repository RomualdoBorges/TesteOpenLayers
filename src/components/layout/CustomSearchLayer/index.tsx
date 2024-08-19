import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import AddressForm from '../../form/AddressForm';
import DaeForm from '../../form/DaeForm';
import HydrometerForm from '../../form/HydrometerForm';
import IptuForm from '../../form/IptuForm';
import DmcVrpForm from '../../form/DmcVrpForm';

interface Menu {
  item: string;
  id: number;
}

const menu: Menu[] = [
  {
    item: 'endereço',
    id: 1,
  },
  {
    item: 'código DAE',
    id: 2,
  },
  {
    item: 'hidrômetro',
    id: 3,
  },
  {
    item: 'IPTU',
    id: 4,
  },
  {
    item: 'DMC/VRP',
    id: 5,
  },
];

const Container = styled(Box)({
  position: 'absolute',
  top: 85,
  left: 340,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#fff',
  borderRadius: '2px',
  boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
  minHeight: '54px',
  padding: '0 16px',
  maxWidth: '100%',
});

const ContainerSelecionada = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
});

const Selecionada = styled(Box)({
  display: 'flex',
  gap: '5px',
});

const ContainerOpcoes = styled(Box)({
  position: 'absolute',
  top: '4px',
  left: '4px',
  backgroundColor: '#fff',
  boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '2px',
});

const Opcoes = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f7f9fb',
  },
});

const CustomSearchLayer: React.FC = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const [selected, setSelected] = useState<string>('endereço');
  const [configWidth, setConfigWidth] = useState(10);
  const configRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (configRef.current) {
      setConfigWidth(configRef.current.offsetWidth + 10);
    }
  }, [openConfig]);

  const handleOpenConfig = () => {
    setOpenConfig(!openConfig);
  };

  const handleSelectOption = (item: Menu['item']) => {
    setSelected(item);
    setOpenConfig(false);
  };

  return (
    <>
      <Container>
        <ContainerSelecionada onClick={handleOpenConfig} ref={configRef}>
          <Selecionada>
            <SearchIcon style={{ color: '#5ABEEC' }} />
            <Selecionada>
              <Typography color={'#8194AB'}>Pesquisar por</Typography>
              <Typography color={'#5ABEEC'}>{selected}</Typography>
            </Selecionada>
            <ExpandMoreIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </Selecionada>
        </ContainerSelecionada>

        {selected === 'endereço' ? (
          <AddressForm />
        ) : selected === 'código DAE' ? (
          <DaeForm />
        ) : selected === 'hidrômetro' ? (
          <HydrometerForm />
        ) : selected === 'IPTU' ? (
          <IptuForm />
        ) : (
          <DmcVrpForm />
        )}

        {openConfig && (
          <ContainerOpcoes sx={{ width: configWidth }}>
            {menu.map((item) => (
              <Opcoes key={item.id} onClick={() => handleSelectOption(item.item)}>
                <SearchIcon style={{ color: '#5ABEEC' }} />
                <Typography style={{ color: '#5ABEEC' }}>{item.item}</Typography>
              </Opcoes>
            ))}
          </ContainerOpcoes>
        )}
      </Container>
    </>
  );
};

export default CustomSearchLayer;
