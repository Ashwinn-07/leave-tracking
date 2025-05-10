import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import type { ILeaveRequest } from "../../types/leaveRequest";
const getStatusIcon = (status: any) => {
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

const getStatusColor = (status: any) => {
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
  const { fetchRequests, cancelRequest } = useStore();
  const [requests, setRequests] = useState<ILeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchRequests();
        const data = Array.isArray(response) ? response : [];
        setRequests(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load leave requests");
        showError("Failed to load leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchRequests]);

  const handleCancelRequest = async (id: any) => {
    try {
      setCancellingId(id);
      await cancelRequest(id);
      showSuccess("Leave Request Cancelled Successfully");
      const updatedRequests = await fetchRequests();
      setRequests(Array.isArray(updatedRequests) ? updatedRequests : []);
    } catch (error) {
      console.error("Failed to cancel request:", error);
      showError("Failed to cancel request");
    } finally {
      setCancellingId(null);
    }
  };

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
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading leave requests...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No leave requests found
                      </td>
                    </tr>
                  ) : (
                    requests.map((leave: any) => (
                      <tr key={leave.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {leave.leaveType?.name || leave.type}
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          {leave.status === "pending" && (
                            <button
                              onClick={() => handleCancelRequest(leave.id)}
                              disabled={cancellingId === leave.id}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 cursor-pointer"
                            >
                              {cancellingId === leave.id ? (
                                "Cancelling..."
                              ) : (
                                <>
                                  <X className="h-3 w-3 mr-1" />
                                  Cancel
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
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

export default MyLeaves;
