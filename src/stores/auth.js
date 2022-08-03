import { defineStore } from "pinia";

export const useAuthStore = defineStore("account", {
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false,
    firstTime: true,
  }),
  persist: true,
  persist: true,
  actions: {
    login(data) {
      this.user = data.user;
      this.token = data.token;
      this.isLoggedIn = true;
      this.firstTime = false;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});
