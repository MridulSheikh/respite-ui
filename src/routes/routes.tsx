import { createBrowserRouter } from "react-router-dom";
import Home from "../components/page/home";
import MainLayout from "../components/layout/MainLayout";
import Supplies from "../components/page/supplies";
import SupplyDetails from "../components/page/supplies/id";
import Login from "../components/page/login";
import Registration from "../components/page/registration";
import Dashboard from "../components/page/dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ManageSupplies from "../components/page/dashboard/supplies";
import CreateSupply from "../components/page/dashboard/supplies/create-supply";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Page404 from "../components/ui/Page404";
import LeaderBoard from "../components/page/leaderboard";
import Community from "../components/page/community";
import ProfileManageMent from "../components/page/dashboard/ProfileManageMent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "supplies",
        element: <Supplies />,
      },
      {
        path: "supplies/:id",
        element: (
          <ProtectedRoute>
            <SupplyDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "community",
        element: (
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "supplies",
        element: <ManageSupplies />,
      },
      {
        path: "create-supply",
        element: <CreateSupply />,
      },
      {
        path: "profile",
        element: <ProfileManageMent />,
      },
    ],
  },
]);

export default router;
