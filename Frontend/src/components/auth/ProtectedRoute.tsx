import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

type ProtectedRouteProps = {
  allowedRoles: Array<"employee" | "manager" | "admin">;
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, authType } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(authType as any)) {
    switch (authType) {
      case "employee":
        return <Navigate to="/employee/dashboard" replace />;
      case "manager":
        return <Navigate to="/manager/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
