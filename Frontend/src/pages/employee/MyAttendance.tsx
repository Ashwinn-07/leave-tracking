import { useState } from "react";
import {
  Clock,
  History,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Dummy data for attendance history
const attendanceHistory = [
  {
    id: "1",
    date: "2024-03-20",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    status: "approved",
    comments: "Regular working day",
  },
  {
    id: "2",
    date: "2024-03-19",
    clockIn: "09:15 AM",
    clockOut: "05:45 PM",
    status: "pending",
    comments: "Delayed due to traffic",
  },
  {
    id: "3",
    date: "2024-03-18",
    clockIn: "08:55 AM",
    clockOut: "05:00 PM",
    status: "rejected",
    comments: "Early departure without approval",
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

const MyAttendance = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  const handleClockInOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    setCurrentTime(timeString);
    setIsClockedIn(!isClockedIn);
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
              className={`px-6 py-2 rounded-md font-medium ${
                isClockedIn
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isClockedIn ? "Clock Out" : "Clock In"}
            </button>
          </div>
          {currentTime && (
            <p className="mt-2 text-gray-600">Last action at: {currentTime}</p>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance History
            </h2>
          </div>
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
                {attendanceHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {record.clockIn}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {record.clockOut}
                      </div>
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
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {record.comments}
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

export default MyAttendance;
