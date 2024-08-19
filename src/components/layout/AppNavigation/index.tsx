import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Container = styled('ul')({
  display: 'flex',
  alignItems: 'center',
});

const CustomLi = styled('li')(({ selected }: { selected: boolean }) => ({
  borderBottom: selected ? '5px solid #5ABEEC' : 'none',
}));

const NavItems = styled(Box)({
  padding: '22px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const CustomLabel = styled(Typography)({
  color: '#004A6E',
});

interface NavItem {
  to: string;
  label: string;
  icon?: ReactNode;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Mapas', icon: <LayersOutlinedIcon sx={{ color: '#004A6E' }} /> },
  { to: '/indicadores', label: 'Indicadores', icon: <AnalyticsOutlinedIcon sx={{ color: '#004A6E' }} /> },
  { to: '/inteligencia', label: 'Inteligência', icon: <AutoAwesomeOutlinedIcon sx={{ color: '#004A6E' }} /> },
  { to: '/balanco', label: 'Balanço Hídrico', icon: <WaterOutlinedIcon sx={{ color: '#004A6E' }} /> },
  { to: '/relatorios', label: 'Relatórios', icon: <ArticleOutlinedIcon sx={{ color: '#004A6E' }} /> },
  { to: '/alertas', label: 'Alertas', icon: <ReportProblemOutlinedIcon sx={{ color: '#004A6E' }} /> },
];

const AppNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav>
      <Container>
        {navItems.map((item, index) => (
          <CustomLi key={index} selected={location.pathname === item.to}>
            <Link to={item.to} style={{ textDecoration: 'none' }}>
              <NavItems>
                {item.icon}
                <CustomLabel>{item.label}</CustomLabel>
              </NavItems>
            </Link>
          </CustomLi>
        ))}
      </Container>
    </nav>
  );
};

export default AppNavigation;
