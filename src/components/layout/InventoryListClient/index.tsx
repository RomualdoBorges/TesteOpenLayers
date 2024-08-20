import React, { useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ClientListType } from '../../../types';
import { useInventory } from '../../../hooks/useInventory';

const Container = styled(Box)({
  width: '100%',
});

const SubTitle = styled(Typography)({
  padding: '28px 0 12px 18px',
  color: '#8194ab',
  fontSize: '14px',
  borderColor: '#004A6E',
});

const HeaderContainer = styled(Box)({
  borderColor: 'divider',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '12px',
});

const TableHeader = styled(Typography)({
  gridColumn: 'span 4',
  color: '#004A6E',
  fontSize: '11px',
  fontWeight: 'bold',
});

const ItemsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '12px',
  borderBottom: '1px solid #ececec',
  '&:hover': {
    backgroundColor: '#f7f9fb',
  },
});

const TableItems = styled(Typography)({
  gridColumn: 'span 4',
  color: '#8194AB',
  fontSize: '12px',
});

interface InventoryListClientProps {
  clientList: ClientListType[];
  onClientSelect: () => void;
}

const InventoryListClient: React.FC<InventoryListClientProps> = ({ clientList, onClientSelect }) => {
  const { setIdSelect } = useInventory();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const paginatedClientList = clientList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleClickItem = (item: ClientListType) => {
    setIdSelect(item.id);
    onClientSelect();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <SubTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        Selecione um cliente para visualizar o inventário:
      </SubTitle>
      <HeaderContainer sx={{ borderBottom: 1 }}>
        <TableHeader>Cod. Cliente</TableHeader>
        <TableHeader>Cat. de Uso</TableHeader>
        <TableHeader>Data Ligação</TableHeader>
      </HeaderContainer>
      {/* Tratamento para quando cliente === null  */}
      {/* {listNull && (
        <Box display={'flex'} gap={'8px'} justifyContent={'center'} alignItems={'center'} padding={'12px'}>
          <ErrorOutlineIcon style={{ color: 'red' }} />
          <Typography color={'red'}>Não há informações sobre os clientes.</Typography>
        </Box>
      )} */}
      {paginatedClientList.map((item) => (
        <ItemsContainer onClick={() => handleClickItem(item)} key={item.id}>
          <TableItems style={{ fontWeight: 'bold' }}>{item.codigo_cliente}</TableItems>
          <TableItems>{item.categoria_de_uso}</TableItems>
          <TableItems>{item.data_ligacao}</TableItems>
        </ItemsContainer>
      ))}
      {clientList.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <Pagination
            count={Math.ceil(clientList.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default InventoryListClient;
