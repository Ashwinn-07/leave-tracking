import React, { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import { formatDate, formatTime } from "../../utils/dateUtil";
import type { IAttendance } from "../../types/attendance";

interface AttendanceResponse {
  message: string;
  data: IAttendance[];
}

const ApproveAttendance = () => {
  const { fetchPendingEdits, approveAttendance } = useStore();
  const [records, setRecords] = useState<IAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  useEffect(() => {
    const loadPending = async () => {
      try {
        setLoading(true);
        const response =
          (await fetchPendingEdits()) as unknown as AttendanceResponse;
        setRecords(response.data);
      } catch (err) {
        setError("Failed to load pending records");
        showError("Failed to load pending records");
      } finally {
        setLoading(false);
      }
    };
    loadPending();
  }, [fetchPendingEdits]);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      await approveAttendance(id, status, comment);
      showSuccess(`Attendance ${status} successfully`);
      const response =
        (await fetchPendingEdits()) as unknown as AttendanceResponse;
      setRecords(response.data);
      setSelectedRecord(null);
      setComment("");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to update attendance";
      showError(errMsg);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              Approve Attendance
            </h1>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading pending records...
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
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock Out
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
                  {records.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No pending attendance records
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <React.Fragment key={record._id}>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {record.employee?.name || "Unknown Employee"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(record.clockIn)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatTime(record.clockIn)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {record.clockOut
                              ? formatTime(record.clockOut)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {record.comments}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-3">
                              <button
                                onClick={() =>
                                  handleAction(record._id, "approved")
                                }
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleAction(record._id, "rejected")
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  setSelectedRecord((prev) =>
                                    prev === record._id ? null : record._id
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <MessageSquare className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {selectedRecord === record._id && (
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

export default ApproveAttendance;
