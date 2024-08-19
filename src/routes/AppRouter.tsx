import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaPadrao from '../pages/PaginaPadrao';
import Mapas from '../pages/Mapas';

const Indicadores = () => <h1>Indicadores</h1>;
const Inteligencia = () => <h1>Inteligência</h1>;
const Balanco = () => <h1>Balanço Hídrico</h1>;
const Relatorios = () => <h1>Relatórios</h1>;
const Alertas = () => <h1>Alertas</h1>;

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Mapas />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/inteligencia" element={<Inteligencia />} />
          <Route path="/balanco" element={<Balanco />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/alertas" element={<Alertas />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
