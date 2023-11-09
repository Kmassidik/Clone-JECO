// router.js
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CategoryPage from "../pages/CategoryPage";
import AddAdmin from "../components/Form/AddAdmin";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      return !localStorage.access_token ? null : redirect("/");
    },
  },
  {
    path: "/",
    element: <App />,
    loader: () => {
      return localStorage.access_token ? null : redirect("/login");
    },
    children: [
      {
        index: true,
        loader: () => redirect("/dashboard"),
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "add-admin",
        element: <AddAdmin />,
      },
    ],
  },
]);

export default router;
