import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  actions: {
    async login(user) {
      try {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
