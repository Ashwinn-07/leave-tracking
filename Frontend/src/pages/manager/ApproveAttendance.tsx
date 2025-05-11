import React, { useState } from "react";
import { Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";

// Dummy data for pending attendance records
const pendingAttendance = [
  {
    id: "1",
    employeeName: "John Doe",
    date: "2024-03-20",
    clockIn: "09:15 AM",
    clockOut: "05:30 PM",
    status: "pending",
    comments: "Late arrival due to traffic",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    date: "2024-03-20",
    clockIn: "08:55 AM",
    clockOut: "04:45 PM",
    status: "pending",
    comments: "Early departure for medical appointment",
  },
];

const ApproveAttendance = () => {
  const [records, setRecords] = useState(pendingAttendance);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, status: action } : record
      )
    );
    setSelectedRecord(null);
    setComment("");
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
                {records.map((record) => (
                  <React.Fragment key={record.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.employeeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {record.date}
                        </div>
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
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {record.comments}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAction(record.id, "approved")}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleAction(record.id, "rejected")}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setSelectedRecord(record.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {selectedRecord === record.id && (
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
                                setSelectedRecord(null);
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

export default ApproveAttendance;
