import React, { ReactNode, CSSProperties } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButton = styled(Button)({
  backgroundColor: '#fff',
  borderRadius: 0,
  padding: '12px',
  minWidth: 0,
  '&:hover': {
    backgroundColor: '#5ABEEC',
    color: '#fff',
    '& svg': {
      color: '#fff',
    },
  },
});

interface ToolsButtonProps {
  ariaLabel: string;
  onClick: () => void;
  icon: ReactNode;
  style?: CSSProperties;
}

const ToolsButton: React.FC<ToolsButtonProps> = ({ ariaLabel, onClick, icon, style }) => {
  return (
    <StyledButton aria-label={ariaLabel} onClick={onClick} style={style}>
      {icon}
    </StyledButton>
  );
};

export default ToolsButton;
