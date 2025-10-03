import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/admin/LoginPage.vue";
import HomePage from "../pages/admin/HomePage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/admin/Home",
  },
  {
    path: "/admin/home",
    name: "AdminHome",
    component: HomePage,
  },
  { path: "/admin/login", name: "AdminLogin", component: LoginPage },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
