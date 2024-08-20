import React, { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const Container = styled(Box)({
  position: 'absolute',
  bottom: 0,
  right: 16,
  zIndex: 1000,
  backgroundColor: '#fff',
  width: 600,
  height: '80vh',
  borderRadius: '2px',
  boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
});

const TitleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  borderBottom: '2px solid #DCE1E8',
});

const IconButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  color: '#5ABEEC',
  cursor: 'pointer',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: '#004A6E',
    borderRadius: '2px',
  },
});

interface CustomWindowProps {
  children?: ReactNode;
  handleWindowClose?: () => void;
  title?: string;
  icon?: ReactNode;
}

const CustomWindow: React.FC<CustomWindowProps> = ({ children, handleWindowClose, title, icon }) => {
  return (
    <Container>
      <TitleContainer>
        <Box display={'flex'} alignItems={'center'} gap={'8px'}>
          {icon}
          <Typography color={'#004A6E'} fontWeight={'bold'}>
            {title}
          </Typography>
        </Box>

        <IconButton onClick={handleWindowClose}>
          <CloseIcon />
        </IconButton>
      </TitleContainer>

      {children}
    </Container>
  );
};

export default CustomWindow;
