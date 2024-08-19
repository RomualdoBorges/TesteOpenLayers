import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const Container = styled(Accordion)({
  borderRadius: '2px',
  width: '310px',
  boxShadow: '0 15px 30px -10px rgba(23, 64, 93, 0.4)',
});

const Summary = styled(AccordionSummary)({
  minHeight: '54px',
});

const TitleContainer = styled(Box)({
  display: 'flex',
  gap: '4px',
});

const CustomTypograph = styled(Typography)({
  color: '#8194AB',
  marginLeft: '5px',
});

const Content = styled(AccordionDetails)({
  maxHeight: '550px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#8194AB',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'gray',
    cursor: 'pointer',
  },
});

interface CustomAccordionProps {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ children, title, icon }) => {
  return (
    <Container>
      <Summary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <TitleContainer>
          {icon}
          <CustomTypograph>{title}</CustomTypograph>
        </TitleContainer>
      </Summary>
      <Content>{children}</Content>
    </Container>
  );
};

export default CustomAccordion;
