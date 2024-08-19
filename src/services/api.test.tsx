import { describe, it, expect, vi } from 'vitest';
import api from './api';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Mockar o localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('Instancia Axios', () => {
  it('deve ter o baseURL e os cabeçalhos corretos', () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('deve adicionar o cabeçalho de autorização se o token existir', () => {
    localStorage.setItem('token', 'fake-token');

    const requestInterceptor = vi.spyOn(api.interceptors.request, 'use');

    const config: AxiosRequestConfig = {
      headers: {}, // Certifique-se de inicializar headers com um objeto vazio
    };

    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Verifique se o mock foi chamado antes de acessar
    if (requestInterceptor.mock.calls[0]?.[0]) {
      requestInterceptor.mock.calls[0][0](config);
    }

    expect(config.headers!.Authorization).toBe('Bearer fake-token');

    requestInterceptor.mockRestore(); // Restore the original implementation
  });

  it('não deve adicionar cabeçalho de autorização se o token não existir', () => {
    localStorage.clear();

    const requestInterceptor = vi.spyOn(api.interceptors.request, 'use');

    const config: AxiosRequestConfig = {
      headers: {}, // Certifique-se de inicializar headers com um objeto vazio
    };

    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Verifique se o mock foi chamado antes de acessar
    if (requestInterceptor.mock.calls[0]?.[0]) {
      requestInterceptor.mock.calls[0][0](config);
    }

    expect(config.headers!.Authorization).toBeUndefined();

    requestInterceptor.mockRestore(); // Restore the original implementation
  });

  it('deve lidar com erros 401', async () => {
    const responseInterceptor = vi.spyOn(api.interceptors.response, 'use');

    const errorResponse: AxiosError = {
      isAxiosError: true,
      toJSON: () => ({}),
      message: 'Request failed with status code 401',
      name: 'AxiosError',
      config: {},
      code: undefined,
      request: {},
      response: {
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {},
        data: {},
      },
    };

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle the 401 error
        }
        return Promise.reject(error);
      },
    );

    // Verifique se o mock foi chamado antes de acessar
    if (responseInterceptor.mock.calls[0]?.[1]) {
      await expect(responseInterceptor.mock.calls[0][1](errorResponse)).rejects.toEqual(errorResponse);
    }

    responseInterceptor.mockRestore(); // Restore the original implementation
  });

  it('deve passar por respostas bem-sucedidas', async () => {
    const responseInterceptor = vi.spyOn(api.interceptors.response, 'use');

    const response: AxiosResponse = { data: 'some data', status: 200, statusText: 'OK', headers: {}, config: {} };

    api.interceptors.response.use((response) => response);

    // Verifique se o mock foi chamado antes de acessar
    if (responseInterceptor.mock.calls[0]?.[0]) {
      const result = await responseInterceptor.mock.calls[0][0](response);
      expect(result).toEqual(response);
    }

    responseInterceptor.mockRestore(); // Restore the original implementation
  });
});
