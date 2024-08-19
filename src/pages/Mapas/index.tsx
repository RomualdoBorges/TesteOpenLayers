import React from 'react';
import CustomMap from '../../components/common/CustomMap';
import { styled } from '@mui/system';

const Container = styled('div')({
  position: 'absolute',
  top: 0,
  height: '100vh',
  width: '100%',
  zIndex: 0,
});

const Mapas: React.FC = () => {
  return (
    <Container>
      <CustomMap />
    </Container>
  );
};

export default Mapas;
