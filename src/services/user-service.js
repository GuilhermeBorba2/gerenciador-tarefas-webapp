import { api } from 'boot/axios';

const baseURL = '/user';

export const userService = {
  async getAllUsers() {
    const response = await api.get(baseURL);
    return response.data;
  },

  async getUserById(id) {
    const response = await api.get(`${baseURL}/${id}`);
    return response.data;
  },

  async updateUser(id, userDetails) {
    const response = await api.put(`${baseURL}/${id}`, userDetails);
    return response.data;
  },

  async deleteUser(id) {
    await api.delete(`${baseURL}/${id}`);
  },

  async registerUser(userDto) {
    const response = await api.post(`${baseURL}/register`, userDto);
    return response.data;
  },
};
