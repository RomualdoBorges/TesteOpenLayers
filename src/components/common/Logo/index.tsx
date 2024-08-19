import React from 'react';
import saesa from '/logo_saesa.svg';
import monitora from '/logo_monitora.svg';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginLeft: '16px',
});

interface LogoProps {
  logoMonitoraSrc?: string;
  logoSaesaSrc?: string;
}

const Logo: React.FC<LogoProps> = ({ logoMonitoraSrc = monitora, logoSaesaSrc = saesa }) => {
  return (
    <Container>
      <img src={logoMonitoraSrc} alt="Logo Monitora" width="162" height="16" />
      <Divider orientation="vertical" flexItem color="#a2a2a2" />
      <img src={logoSaesaSrc} alt="Logo Saesa" width="116" height="34" />
    </Container>
  );
};

export default Logo;
