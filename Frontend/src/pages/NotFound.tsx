import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        The page you are looking for is under construction.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
