import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <ManagerSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
