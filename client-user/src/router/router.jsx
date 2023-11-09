// router.js
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import DetailPage from "../pages/DetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("/home"),
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
      {
        path: "*",
        loader: () => redirect("/home"),
      },
    ],
  },
]);

export default router;
