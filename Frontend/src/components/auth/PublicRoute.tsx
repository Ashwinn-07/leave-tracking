import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ redirectPath }: any) => {
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
