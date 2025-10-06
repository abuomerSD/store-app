import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/admin/LoginPage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import CategoriesPage from "../pages/admin/CategoriesPage.vue";
import CategoriesDetailsPage from "../pages/admin/CategoriesDetailsPage.vue";
import UnitsPage from "../pages/admin/UnitsPage.vue";
import UsersPage from "../pages/admin/UsersPage.vue";
import ProductsPage from "../pages/admin/ProductsPage.vue";
import CustomerProductsPage from "../pages/customer/ProductsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/customer/products",
  },
  {
    path: "/customer/products",
    name: "CustomerProductsPage",
    component: CustomerProductsPage,
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
  // {
  //   path: "/admin/units",
  //   name: "AdminUnits",
  //   component: UnitsPage,
  // },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: UsersPage,
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: ProductsPage,
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
