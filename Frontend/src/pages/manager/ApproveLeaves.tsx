import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import { formatDate } from "../../utils/dateUtil";
import type { ILeaveRequest } from "../../types/leaveRequest";

interface LeaveRequestResponse {
  message: string;
  data: ILeaveRequest[];
}

const ApproveLeaves = () => {
  const { listPending, approveLeave } = useStore();
  const [requests, setRequests] = useState<ILeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  useEffect(() => {
    const loadPending = async () => {
      try {
        setLoading(true);
        const response =
          (await listPending()) as unknown as LeaveRequestResponse;
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load pending requests");
        showError("Failed to load pending requests");
      } finally {
        setLoading(false);
      }
    };
    loadPending();
  }, [listPending]);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      await approveLeave(id, status, comment);
      showSuccess(`Leave request ${status} successfully`);
      const response = (await listPending()) as unknown as LeaveRequestResponse;
      setRequests(response.data);
      setSelectedRequest(null);
      setComment("");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Failed to update request";
      showError(errMsg);
    }
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
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading pending requests...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
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
                  {requests.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No pending leave requests
                      </td>
                    </tr>
                  ) : (
                    requests.map((request) => (
                      <React.Fragment key={request._id}>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {request.userId?.name || "Unknown Employee"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {request.leaveTypeId?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(request.startDate)}
                              {request.startDate !== request.endDate && (
                                <> - {formatDate(request.endDate)}</>
                              )}
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-3">
                              <button
                                onClick={() =>
                                  handleAction(request._id, "approved")
                                }
                                className="text-green-600 hover:text-green-800"
                                title="Approve"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleAction(request._id, "rejected")
                                }
                                className="text-red-600 hover:text-red-800"
                                title="Reject"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  setSelectedRequest((prev) =>
                                    prev === request._id ? null : request._id
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800"
                                title="Add Comment"
                              >
                                <MessageSquare className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {selectedRequest === request._id && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4">
                              <div className="flex space-x-4">
                                <input
                                  type="text"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Add approval comment..."
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveLeaves;
