import api from '../api';
import { DaeResponse, Endereco, EnderecoResponse } from '../../types';

export const getEnderecos = async (query: string): Promise<Endereco[]> => {
  const response = await api.get<Endereco[]>(`/search/auto_complit_adress?endereco=${query}`);
  return response.data;
};

export const searchEndereco = async (street: string, number: string): Promise<EnderecoResponse> => {
  const response = await api.get<EnderecoResponse>(`/search/endereco?street=${street}&number=${number}`);
  return response.data;
};

export const searchDae = async (number: string): Promise<DaeResponse> => {
  const response = await api.get<DaeResponse>(`/search/client_cod_dae?cod_dae=${number}`);
  return response.data;
};
