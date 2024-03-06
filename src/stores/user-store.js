import { defineStore } from 'pinia';
import { userService } from '../services/user-service';
import { api } from 'boot/axios';
import { jwtDecode } from 'jwt-decode';
import { userUpdateStore } from 'stores/userUpdate-store'
import { useGlobalMessageStore } from 'stores/global-message'



export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('token') || '',
    user: null,
    userDetails: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.userDetails?.username || 'Convidado',
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
        await this.fetchCurrentUserDetails();
        sessionStorage.setItem('user_details', JSON.stringify(this.userDetails));
      } catch (error) {
        console.error('Erro ao realizar login:', error);
        throw error;
      }
    },
    setToken(token) {
      if (token) {
        this.token = token;
        sessionStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        this.token = '';
        sessionStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      }
    },
    async logout() {
      this.token = '';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user_details');
      delete api.defaults.headers.common['Authorization'];
      this.user = null;
      this.userDetails = null;
      await userUpdateStore().limparUsuario();
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
        this.userDetails = updatedUser;
        sessionStorage.setItem('user_details', JSON.stringify(updatedUser));
        useGlobalMessageStore().addMessage({
          type: 'success',
          text: 'Usuário atualizado com sucesso!',
        });
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        useGlobalMessageStore().addMessage({
          type: "error",
          text: "Erro ao atualizar o usuário",
        });
      }
    }
    ,
    async registerUser(userDto) {
      try {
        const registerUser = await userService.registerUser(userDto);
        this.user = registerUser;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
      }
    },
    recoverUserDetails() {
      const userDetails = sessionStorage.getItem('user_details');
      if (userDetails) {
        this.userDetails = JSON.parse(userDetails);
      }
    },
  },
  persist: {
    enabled: true,
    storage: window.sessionStorage,
  },
});
