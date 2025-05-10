const ManagerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Manager Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Team Summary
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-blue-600">8/10</span>
                <span className="ml-2 text-gray-500">team members present</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Pending Approvals
              </h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-amber-600">5</span>
                <span className="ml-2 text-gray-500">leave requests</span>
              </div>
            </div>

            <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Upcoming Time Off
              </h3>
              <div className="flex items-center">
                <span className="text-gray-700">2 team members</span>
                <span className="ml-2 text-gray-500">off next week</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
