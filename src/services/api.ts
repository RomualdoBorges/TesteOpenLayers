import axios from 'axios';

// Crie uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' },
});

// Configurações globais para interceptadores
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação ou outras configurações de request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manipulação de erros globais
    if (error.response.status === 401) {
      // Redirecionar para login ou realizar outra ação
    }
    return Promise.reject(error);
  },
);

export default api;
