import React, { useState } from "react";
import { Home, CalendarClock, Calendar, Clock, LogOut } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
          active
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

const EmployeeSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleNavClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">TimeTrack</h2>
        <p className="text-sm text-gray-500 mt-1">Employee Portal</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            active={activeItem === "Home"}
            onClick={() => handleNavClick("Home")}
          />
          <NavItem
            icon={<CalendarClock size={20} />}
            label="Request Leave"
            active={activeItem === "Request Leave"}
            onClick={() => handleNavClick("Request Leave")}
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="My Leaves"
            active={activeItem === "My Leaves"}
            onClick={() => handleNavClick("My Leaves")}
          />
          <NavItem
            icon={<Clock size={20} />}
            label="My Attendance"
            active={activeItem === "My Attendance"}
            onClick={() => handleNavClick("My Attendance")}
          />
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
