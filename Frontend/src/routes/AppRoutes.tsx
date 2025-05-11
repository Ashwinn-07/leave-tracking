import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import { useStore } from "../stores/authStore";
import RequestLeave from "../pages/employee/RequestLeave";
import MyLeaves from "../pages/employee/MyLeaves";
import EmployeeLayout from "../layouts/EmployeeLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";
import LeaveTypes from "../pages/admin/LeaveTypes";
import MyAttendance from "../pages/employee/MyAttendance";
import ApproveLeaves from "../pages/manager/ApproveLeaves";
import ApproveAttendance from "../pages/manager/ApproveAttendance";
import Holidays from "../pages/admin/Holidays";

export const AppRoutes = () => {
  const { isAuthenticated, authType } = useStore();

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
        <Route element={<EmployeeLayout />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/request" element={<RequestLeave />} />
          <Route path="/employee/status" element={<MyLeaves />} />
          <Route path="/employee/attendance" element={<MyAttendance />} />
        </Route>
      </Route>

      {/* Protected Routes - Manager */}
      <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
        <Route element={<ManagerLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route
            path="/manager/approve-attendance"
            element={<ApproveAttendance />}
          />
          <Route path="/manager/approve-leaves" element={<ApproveLeaves />} />
        </Route>
      </Route>

      {/* Protected Routes - Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/leave-types" element={<LeaveTypes />} />
          <Route path="/admin/holidays" element={<Holidays />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
