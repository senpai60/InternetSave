import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SavedPage from "./pages/saved/SavedPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AuthPage from "./pages/auth/AuthPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MainLayout from "./components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "saved",
        element: <SavedPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "login",
        element: <AuthPage />,
      },
      {
        path: "register",
        element: <AuthPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: (
          <div className="p-20 text-center">
            <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-zinc-400">
              The page you are looking for doesn't exist.
            </p>
          </div>
        ),
      },
    ],
  },
]);

export default router;
