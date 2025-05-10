import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const leaveRequests = [
  {
    id: "1",
    type: "Annual Leave",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    status: "approved",
    comments: "Family vacation",
  },
  {
    id: "2",
    type: "Sick Leave",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    status: "rejected",
    comments: "Doctor appointment",
  },
  {
    id: "3",
    type: "Personal Leave",
    startDate: "2024-03-25",
    endDate: "2024-03-25",
    status: "pending",
    comments: "Personal matters",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-50 text-green-700 border-green-100";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-100";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-100";
    default:
      return "";
  }
};

const MyLeaves = () => {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">My Leaves</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveRequests.map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {leave.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span>
                          {leave.startDate === leave.endDate
                            ? leave.startDate
                            : `${leave.startDate} - ${leave.endDate}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(leave.status)}
                        <span
                          className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {leave.status.charAt(0).toUpperCase() +
                            leave.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {leave.comments}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaves;
