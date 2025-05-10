import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/authStore";

const AuthGuard = ({ children }: any) => {
  const { isAuthenticated, authType } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && authType) {
      const basePath = `/${authType}`;

      if (!window.location.pathname.startsWith(basePath)) {
        const targetPath = getRedirectPathForRole(authType);
        navigate(targetPath);
      }
    }
  }, [isAuthenticated, authType, navigate]);

  const getRedirectPathForRole = (role: any) => {
    switch (role) {
      case "employee":
        return "/employee/dashboard";
      case "manager":
        return "/manager/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/login";
    }
  };

  return children;
};

export default AuthGuard;
