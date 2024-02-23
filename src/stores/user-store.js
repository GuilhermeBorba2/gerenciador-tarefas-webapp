// src/stores/userStore.js

import { defineStore } from 'pinia';
import { userService } from '../services/user-service';
import { api } from 'boot/axios'
import {jwtDecode} from 'jwt-decode';


export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
    userDetails: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.userDetails?.username || 'Convidado'
    ,
  },
  actions: {
    setUser(details) {
      this.userDetails = details;
    },
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        const token = response.data.token;
        this.setToken(token);

      } catch (error) {
        console.error('Erro ao realizar login:', error);
        throw error;
      }
    },
    setToken(token) {
      if (token) {
        this.token = token;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    },
    async fetchCurrentUserDetails() {
      if (!this.token) return;
      try {
        const decoded = jwtDecode(this.token);
        const user = await userService.getUserById(decoded.userId);
        this.setUser(user);
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário atual:', error);
      }
    },
    async fetchUserById(id) {
      try {
        const user = await userService.getUserById(id);
        this.user = user;
      } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
      }
    },
    async updateUser(id, userDetails) {
      try {
        const updatedUser = await userService.updateUser(id, userDetails);
        this.user = updatedUser;
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }
    },
    async registerUser(userDto) {
      try {
        const registerUser = await userService.registerUser(userDto);
        this.user = registerUser;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
      }
    },
  },
});
