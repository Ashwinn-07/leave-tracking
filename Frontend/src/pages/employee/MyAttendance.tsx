import { useEffect, useState } from "react";
import {
  Clock,
  History,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import { formatDate, formatTime } from "../../utils/dateUtil";
import type { IAttendance } from "../../types/attendance";

interface AttendanceResponse {
  message: string;
  data: IAttendance[];
}

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

const MyAttendance = () => {
  const { clockIn, clockOut, fetchMyAttendance } = useStore();
  const [attendanceData, setAttendanceData] = useState<IAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentActionLoading, setCurrentActionLoading] = useState(false);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);
        const response =
          (await fetchMyAttendance()) as unknown as AttendanceResponse;
        setAttendanceData(response.data);
      } catch (err) {
        setError("Failed to load attendance records");
        showError("Failed to load attendance records");
      } finally {
        setLoading(false);
      }
    };
    loadAttendance();
  }, [fetchMyAttendance]);

  const latestAttendance = attendanceData[attendanceData.length - 1];
  const isClockedIn = Boolean(latestAttendance && !latestAttendance.clockOut);

  const handleClockInOut = async () => {
    try {
      setCurrentActionLoading(true);
      if (isClockedIn) {
        await clockOut();
        showSuccess("Clocked out successfully");
      } else {
        await clockIn();
        showSuccess("Clocked in successfully");
      }
      const response =
        (await fetchMyAttendance()) as unknown as AttendanceResponse;
      setAttendanceData(response.data);
    } catch (err: any) {
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to perform action";
      showError(errMsg);
    } finally {
      setCurrentActionLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">
                My Attendance
              </h1>
            </div>
            <button
              onClick={handleClockInOut}
              disabled={currentActionLoading}
              className={`px-6 py-2 rounded-md font-medium cursor-pointer ${
                isClockedIn
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {currentActionLoading
                ? "Processing..."
                : isClockedIn
                ? "Clock Out"
                : "Clock In"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance History
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading attendance records...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    attendanceData.map((record) => (
                      <tr key={record._id}>
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(record.status)}
                            <span
                              className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                record.status
                              )}`}
                            >
                              {record.status.charAt(0).toUpperCase() +
                                record.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.comments || "No comments"}
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

export default MyAttendance;
