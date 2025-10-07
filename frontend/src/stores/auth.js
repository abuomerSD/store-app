import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    // isSessionChecked: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    login(user, auth_token) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth_token", auth_token);
      // this.isSessionChecked = true;
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
      // this.isSessionChecked = true;
    },
  },
});
