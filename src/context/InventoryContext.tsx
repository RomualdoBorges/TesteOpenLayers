import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { searchIptu } from '../services/SearchService/searchService';
import { IptuResponse, ClientListType } from '../types';

export interface InventoryContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setor: string;
  setSetor: React.Dispatch<React.SetStateAction<string>>;
  quadra: string;
  setQuadra: React.Dispatch<React.SetStateAction<string>>;
  lote: string;
  setLote: React.Dispatch<React.SetStateAction<string>>;
  clientList: ClientListType[];
  loading: boolean;
  idSelect: number;
  setIdSelect: React.Dispatch<React.SetStateAction<number>>;
}

interface InventoryProviderProps {
  children: ReactNode;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [setor, setSetor] = useState<string>('');
  const [quadra, setQuadra] = useState<string>('');
  const [lote, setLote] = useState<string>('');
  const [clientList, setClientList] = useState<ClientListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<number>(0);

  const fetchDataIptu = useCallback(async () => {
    setLoading(true);
    try {
      const response: IptuResponse = await searchIptu(setor, quadra, lote);
      const clientes = response.type.features[0].properties.informacoes_clientes;
      setClientList(clientes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setor, quadra, lote]);

  useEffect(() => {
    if (open) {
      fetchDataIptu();
    }
  }, [fetchDataIptu, open]);

  return (
    <InventoryContext.Provider
      value={{
        open,
        setOpen,
        setor,
        setSetor,
        quadra,
        setQuadra,
        lote,
        setLote,
        clientList,
        loading,
        idSelect,
        setIdSelect,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext, InventoryProvider };
