import { Home, CheckSquare, Clock, Calendar, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../stores/authStore";
import { showSuccess } from "../../utils/notifications";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
      </NavLink>
    </li>
  );
};

const ManagerSidebar: React.FC = () => {
  const { logout } = useStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">TimeTrack</h2>
        <p className="text-sm text-gray-500 mt-1">Manager Portal</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            to="/manager/dashboard"
          />
          <NavItem
            icon={<CheckSquare size={20} />}
            label="Approve Leaves"
            to="/manager/approve-leaves"
          />
          <NavItem
            icon={<Clock size={20} />}
            label="Approve Attendance"
            to="/manager/approve-attendance"
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="Team Calendar"
            to="/manager/team-calendar"
          />
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default ManagerSidebar;
