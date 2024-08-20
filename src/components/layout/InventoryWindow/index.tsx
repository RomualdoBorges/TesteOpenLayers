import React, { useEffect, useState } from 'react';
import { useInventory } from '../../../hooks/useInventory';
import CustomWindow from '../../common/CustomWindow';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import InventoryListClient from '../InventoryListClient';
import { Box, Tab, Tabs } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const InventoryWindow: React.FC = () => {
  const { open, setOpen, clientList, loading, setSetor, setQuadra, setLote } = useInventory();
  const [view, setView] = useState<'list' | 'inventory'>('list');
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (clientList.length > 1) {
      setView('list');
    } else {
      setValue(0);
      setView('inventory');
    }
  }, [open, clientList]);

  const handleClientSelect = () => {
    setView('inventory');
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {open && (
        <CustomWindow
          handleWindowClose={() => {
            setOpen(false);
            setSetor('');
            setQuadra('');
            setLote('');
          }}
          title="Inventário"
          icon={<InventoryIcon fontSize="small" sx={{ color: '#004A6E' }} />}
          loading={loading}
        >
          {view === 'list' && <InventoryListClient clientList={clientList} onClientSelect={handleClientSelect} />}
          {view === 'inventory' && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  centered
                  variant="fullWidth"
                >
                  <Tab
                    label={<span style={{ textTransform: 'capitalize' }}>Inventário do cliente</span>}
                    icon={<InventoryIcon fontSize="small" />}
                    iconPosition="start"
                    {...a11yProps(0)}
                    // disabled={errorInventory}
                  />
                  <Tab
                    label={<span style={{ textTransform: 'capitalize' }}>Gráfico de consumo</span>}
                    icon={<BarChartIcon fontSize="small" />}
                    iconPosition="start"
                    {...a11yProps(1)}
                    // disabled={errorInventory}
                  />
                  <Tab
                    label={<span style={{ textTransform: 'capitalize' }}>Histórico</span>}
                    icon={<HistoryIcon fontSize="small" />}
                    iconPosition="start"
                    {...a11yProps(2)}
                    // disabled={errorInventory}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <h1>Teste</h1>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <h1>Teste</h1>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <h1>Teste</h1>
              </CustomTabPanel>
            </Box>
          )}
        </CustomWindow>
      )}
    </>
  );
};

export default InventoryWindow;
