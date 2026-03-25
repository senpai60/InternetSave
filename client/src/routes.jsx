import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SavedPage from "./pages/saved/SavedPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import MainLayout from "./components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/saved",
        element: <SavedPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
