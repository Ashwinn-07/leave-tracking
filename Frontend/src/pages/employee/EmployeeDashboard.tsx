const EmployeeDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Employee Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Leave Balance
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">15</span>
                <span className="ml-2 text-gray-500">days remaining</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Attendance Status
              </h3>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-700">Present Today</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Next Holiday
              </h3>
              <div className="flex items-end">
                <span className="text-gray-700">New Year's Day</span>
                <span className="ml-2 text-gray-500">in 10 days</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
