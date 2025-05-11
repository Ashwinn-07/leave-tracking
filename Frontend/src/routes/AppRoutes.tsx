import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useStore } from "../stores/authStore";

import EmployeeLayout from "../layouts/EmployeeLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import LoadingFallback from "../components/LoadingFallback";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";

const EmployeeDashboard = lazy(
  () => import("../pages/employee/EmployeeDashboard")
);
const RequestLeave = lazy(() => import("../pages/employee/RequestLeave"));
const MyLeaves = lazy(() => import("../pages/employee/MyLeaves"));
const MyAttendance = lazy(() => import("../pages/employee/MyAttendance"));

const ManagerDashboard = lazy(
  () => import("../pages/manager/ManagerDashboard")
);
const ApproveAttendance = lazy(
  () => import("../pages/manager/ApproveAttendance")
);
const ApproveLeaves = lazy(() => import("../pages/manager/ApproveLeaves"));

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const LeaveTypes = lazy(() => import("../pages/admin/LeaveTypes"));
const Holidays = lazy(() => import("../pages/admin/Holidays"));

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
          <Route
            path="/employee/dashboard"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <EmployeeDashboard />
              </Suspense>
            }
          />
          <Route
            path="/employee/request"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RequestLeave />
              </Suspense>
            }
          />
          <Route
            path="/employee/status"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <MyLeaves />
              </Suspense>
            }
          />
          <Route
            path="/employee/attendance"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <MyAttendance />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Protected Routes - Manager */}
      <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
        <Route element={<ManagerLayout />}>
          <Route
            path="/manager/dashboard"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ManagerDashboard />
              </Suspense>
            }
          />
          <Route
            path="/manager/approve-attendance"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ApproveAttendance />
              </Suspense>
            }
          />
          <Route
            path="/manager/approve-leaves"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ApproveLeaves />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Protected Routes - Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="/admin/leave-types"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LeaveTypes />
              </Suspense>
            }
          />
          <Route
            path="/admin/holidays"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Holidays />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
