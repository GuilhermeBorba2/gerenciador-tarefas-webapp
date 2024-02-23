import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => response, (error) => {
  let errorMessage = "Erro em chamada de API";
  if (error.response) {
    switch (error.response.status) {
      case 401:
        errorMessage = "Acesso negado. Verifique suas credenciais!!!";
        break;
      case 403:
        errorMessage = "Acesso negado. Sem permissão de acesso ao recurso!!!";
        break;
      default:
        errorMessage = error.response.data.detail || errorMessage;
    }
  }
  return Promise.reject(errorMessage);
});

export default boot(({ app }) => {

  app.config.globalProperties.$api = api;
});

export { api };
