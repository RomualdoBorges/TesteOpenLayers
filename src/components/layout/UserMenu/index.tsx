import React, { useState } from 'react';
import { styled } from '@mui/system';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';

const Container = styled('div')({
  position: 'relative',
});

const Menu = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'grid',
  backgroundColor: '#fff',
  boxShadow: '0 15px 30px -10px rgba(23, 64, 93, 0.4)',
});

const MenuButton = styled(Button)({
  padding: '24px',
  textTransform: 'capitalize',
  justifyContent: 'flex-end',
  color: '#004A6E',
  borderRadius: 0,
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    color: '#004A6E',
  },
  '&:hover': {
    backgroundColor: '#5ABEEC',
    color: '#fff',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      color: '#fff',
    },
  },
});

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <MenuButton
        startIcon={<PersonOutlineOutlinedIcon />}
        endIcon={<ExpandMoreOutlinedIcon />}
        onClick={toggleMenu}
        sx={{ padding: '24px', textTransform: 'capitalize', color: '#004A6E', borderRadius: 0 }}
      >
        André Cury
      </MenuButton>
      {isOpen && (
        <Menu>
          <MenuButton
            startIcon={<PersonOutlineOutlinedIcon />}
            endIcon={<ExpandMoreOutlinedIcon />}
            onClick={toggleMenu}
          >
            André Cury
          </MenuButton>
          <MenuButton endIcon={<SettingsOutlinedIcon />}>Configurações</MenuButton>
          <MenuButton endIcon={<LaunchOutlinedIcon />}>Acessar TTSQL</MenuButton>
          <MenuButton endIcon={<LogoutOutlinedIcon />}>Encerrar sessão</MenuButton>
        </Menu>
      )}
    </Container>
  );
};

export default UserMenu;
