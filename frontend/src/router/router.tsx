import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LoginPage from "../pages/admin/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/admin/HomePage";
import { PrivateRoute } from "../components/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import CategoriesPage from "../pages/admin/categories/CategoriesPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/categories",
        element: (
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/private",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
