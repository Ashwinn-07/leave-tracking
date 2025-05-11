import React, { useState } from "react";
import { Calendar, CheckCircle, XCircle, MessageSquare } from "lucide-react";

// Dummy data for pending leave requests
const pendingLeaves = [
  {
    id: "1",
    employeeName: "John Doe",
    leaveType: "Annual Leave",
    startDate: "2024-03-25",
    endDate: "2024-03-27",
    halfDay: false,
    status: "pending",
    comments: "Family vacation",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    leaveType: "Sick Leave",
    startDate: "2024-03-28",
    endDate: "2024-03-28",
    halfDay: true,
    status: "pending",
    comments: "Doctor appointment",
  },
];

const ApproveLeaves = () => {
  const [requests, setRequests] = useState(pendingLeaves);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
    setSelectedRequest(null);
    setComment("");
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              Approve Leave Requests
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Half Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <React.Fragment key={request.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.employeeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.leaveType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.startDate === request.endDate
                            ? request.startDate
                            : `${request.startDate} - ${request.endDate}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.halfDay ? "Yes" : "No"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {request.comments}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAction(request.id, "approved")}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleAction(request.id, "rejected")}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setSelectedRequest(request.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Add Comment"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {selectedRequest === request.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4">
                          <div className="flex space-x-4">
                            <input
                              type="text"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                              onClick={() => {
                                setSelectedRequest(null);
                                setComment("");
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Save Comment
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveLeaves;
