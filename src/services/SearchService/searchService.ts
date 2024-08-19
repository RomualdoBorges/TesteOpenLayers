import api from '../api';
import {
  CruzamentoResponse,
  DaeResponse,
  DmcVrp,
  DmcVrpResponse,
  Endereco,
  EnderecoResponse,
  IptuResponse,
} from '../../types';

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

export const searchIptu = async (sector: string, block: string, batch: string): Promise<IptuResponse> => {
  const response = await api.get<IptuResponse>(`/search/ligacao_iptu?setor=${sector}&quadra=${block}&lote=${batch}`);
  return response.data;
};

export const searchCruzamento = async (sector: string, block: string): Promise<CruzamentoResponse> => {
  const response = await api.get<CruzamentoResponse>(`/search/ligacao_iptu?setor=${sector}&quadra=${block}`);
  return response.data;
};

export const getDmcVrp = async (query: string): Promise<DmcVrp[]> => {
  const response = await api.get<DmcVrp[]>(`/search/auto_complit_dmc?dmc=${query}`);
  return response.data;
};

export const searchDmcVrp = async (number: string): Promise<DmcVrpResponse> => {
  const response = await api.get<DmcVrpResponse>(`/search/dmc?dmc=${number}`);
  return response.data;
};
