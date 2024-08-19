import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../../components/layout/AppBar';

const PaginaPadrao: React.FC = () => {
  return (
    <>
      <AppBar />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PaginaPadrao;
