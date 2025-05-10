import AdminSidebar from "../../components/sidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Total Users
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">156</span>
                <span className="ml-2 text-gray-500">active</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Leave Types
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-green-600">8</span>
                <span className="ml-2 text-gray-500">configured</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Holidays
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-purple-600">12</span>
                <span className="ml-2 text-gray-500">this year</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Departments
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-amber-600">5</span>
                <span className="ml-2 text-gray-500">total</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
