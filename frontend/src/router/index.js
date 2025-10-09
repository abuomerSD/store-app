import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import { useAuthStore } from "../stores/auth";
import LoginPage from "../pages/admin/LoginPage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import CategoriesPage from "../pages/admin/CategoriesPage.vue";
import CategoriesDetailsPage from "../pages/admin/CategoriesDetailsPage.vue";
import UsersPage from "../pages/admin/UsersPage.vue";
import ProductsPage from "../pages/admin/ProductsPage.vue";
import CustomerProductsPage from "../pages/customer/ProductsPage.vue";
import { API_URL } from "../config/env";

const routes = [
  { path: "/", redirect: "/customer/products" },
  { path: "/customer", redirect: "/customer/products" },
  {
    path: "/customer/products",
    name: "CustomerProductsPage",
    component: CustomerProductsPage,
  },
  { path: "/admin", redirect: "/admin/login" },
  { path: "/admin/login", name: "AdminLogin", component: LoginPage },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/categories",
    name: "AdminCategories",
    component: CategoriesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/categories/:id",
    name: "AdminCategoriesDetails",
    component: CategoriesDetailsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: UsersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: ProductsPage,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth_token = localStorage.getItem("auth_token");
  let isAuthenticated = false;
  await axios
    .post(`${API_URL}auth/verify-token`, { auth_token })
    .then((res) => {
      console.log("verify res", res);
      if (res.status === "success") {
        isAuthenticated = true;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  if (to.meta.requiresAuth && !auth_token && !isAuthenticated) {
    next("/admin/login");
  } else {
    next();
  }
});

export default router;
