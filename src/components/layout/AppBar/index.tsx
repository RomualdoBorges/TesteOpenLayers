import React from 'react';
import { styled } from '@mui/system';
import Logo from '../../common/Logo';
import AppNavigation from '../AppNavigation';
import UserMenu from '../UserMenu';

const Container = styled('header')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  boxShadow: '0px -10px 50px 2px rgba(23, 64, 93, 0.6)',
  position: 'relative',
  zIndex: 1000,
});

const AppBar: React.FC = () => {
  return (
    <Container data-testid="app-bar">
      <Logo />
      <AppNavigation />
      <UserMenu />
    </Container>
  );
};

export default AppBar;
