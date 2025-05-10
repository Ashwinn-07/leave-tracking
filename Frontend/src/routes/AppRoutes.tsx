import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import { useAuthStore } from "../stores/authStore";

export const AppRoutes = () => {
  const { isAuthenticated, authType } = useAuthStore();

  const getRedirectPath = () => {
    if (isAuthenticated && authType) {
      switch (authType) {
        case "employee":
          return "/employee/dashboard";
        case "manager":
          return "/manager/dashboard";
        case "admin":
          return "/admin/dashboard";
        default:
          return "/login";
      }
    }
    return null;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute redirectPath={getRedirectPath()} />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes - Employee */}
      <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      </Route>

      {/* Protected Routes - Manager */}
      <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route>

      {/* Protected Routes - Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
