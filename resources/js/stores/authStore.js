import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    success: false,
    error: null
  }),

  actions: {
    async register(form) {
      try {
        const response = await axios.post('/register', form);
        this.user = response.data.user;
        this.success = true;
        this.error = null;
      } catch (err) {
        this.success = false;
        this.error = err.response?.data?.message || 'Registration failed'
      }
    },

    async login(form) {
      try {
        const response = await axios.post('/login', form);
        this.user = response.data.user;
        this.success = true;
        this.error = null;
      } catch (err) {
        this.success = false;
        this.error = err.response?.data?.message || 'Login failed'
      }
    },
  }
})