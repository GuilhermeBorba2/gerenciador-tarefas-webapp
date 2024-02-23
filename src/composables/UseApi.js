import { api } from "boot/axios";
import { useGlobalMessageStore } from "stores/global-message";

export default function useApi(url) {
  const handleError = (error) => {
    let message = "Erro em chamada de API";
    if (error.response && error.response.data && error.response.data.detail) {
      message = error.response.data.detail;
    } else if (error.request) {
      message = "Não foi possível obter resposta da requisição";
    }
    console.error("API Error:", error);
    useGlobalMessageStore().addMessage({
      type: "error",
      text: message,
    });
    throw error; // Re-throw the error after handling
  };

  const list = async (params) => {
    try {
      const { data } = await api.get(url, { params });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const save = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const update = async (id, form) => {
    try {
      const { data } = await api.put(`${url}/${id}`, form);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`${url}/${id}`);
    } catch (error) {
      handleError(error);
    }
  };

  return { list, getById, save, update, remove };
}
