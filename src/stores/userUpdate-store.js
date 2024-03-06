import { defineStore } from 'pinia';
import { useUserStore } from './user-store';


export const userUpdateStore = defineStore('userUpdate', {
  state: () => {
    const userDetailsString = sessionStorage.getItem('user_details');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

    const userStore = useUserStore();
    return {
      usuario: {
        id: userDetails?.id || '',
        username: userDetails?.username || userStore.userDetails?.username || '',
        email: userDetails?.email || userStore.userDetails?.email || '',
        nickname: userDetails?.nickname || userStore.userDetails?.nickname || '',
        phonenumber: userDetails?.phoneNumber || userStore.userDetails?.phoneNumber || '',
      },
    };
  },
  actions: {
    async limparUsuario() {
      sessionStorage.removeItem('user_details');
      this.usuario = {
        id: '',
        username: '',
        email: '',
        nickname: '',
        phonenumber: '',
        newPassword: '',
      };
    },
  },
  persist: {
    enabled: true,
    storage: window.sessionStorage,
  },
});
