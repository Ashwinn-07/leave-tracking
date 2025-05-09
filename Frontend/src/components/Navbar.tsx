import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">TimeTrack</span>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
