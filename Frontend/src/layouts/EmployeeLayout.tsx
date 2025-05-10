import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <EmployeeSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
