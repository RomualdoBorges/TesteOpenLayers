import { useContext } from 'react';
import { InventoryContext, InventoryContextType } from '../context/InventoryContext';

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within a MapProvider');
  }
  return context;
};
