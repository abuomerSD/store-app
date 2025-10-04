import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/admin/LoginPage.vue";
import HomePage from "../pages/admin/HomePage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import CategoriesPage from "../pages/admin/CategoriesPage.vue";
import CategoriesDetailsPage from "../pages/admin/CategoriesDetailsPage.vue";

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
  {
    path: "/admin/categories",
    name: "AdminCategories",
    component: CategoriesPage,
  },
  {
    path: "/admin/categories/:id",
    name: "AdminCategoriesDetails",
    component: CategoriesDetailsPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
