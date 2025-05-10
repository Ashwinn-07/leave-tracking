import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import type { ILeaveType } from "../../types/leaveType";

interface LeaveTypesResponse {
  message: string;
  data: ILeaveType[];
}

const RequestLeave = () => {
  const { fetchTypes, submitRequest } = useStore();
  const [leaveTypes, setLeaveTypes] = useState<ILeaveType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    halfDay: false,
    comments: "",
  });

  useEffect(() => {
    const loadLeaveTypes = async () => {
      try {
        setIsLoading(true);
        const types = (await fetchTypes()) as unknown as LeaveTypesResponse;
        setLeaveTypes(types.data);
      } catch (err) {
        setFetchError("Failed to fetch leave types");
        showError("Failed to fetch leave types");
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaveTypes();
  }, [fetchTypes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.startDate > formData.endDate) {
      showError("End date cannot be before start date");
      return;
    }

    try {
      await submitRequest({
        leaveTypeId: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        halfDay: formData.halfDay,
        comments: formData.comments,
      });

      showSuccess("Leave request submitted successfully");

      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        halfDay: false,
        comments: "",
      });
    } catch (err: any) {
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to submit leave request";
      showError(errMsg);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Request Leave</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              value={formData.leaveType}
              onChange={(e) =>
                setFormData({ ...formData, leaveType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isLoading || !!fetchError}
            >
              <option value="">Select a leave type</option>
              {isLoading ? (
                <option>Loading leave types...</option>
              ) : fetchError ? (
                <option>Error loading leave types</option>
              ) : (
                leaveTypes.map((type: any) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="halfDay"
                checked={formData.halfDay}
                onChange={(e) =>
                  setFormData({ ...formData, halfDay: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="halfDay"
                className="ml-2 block text-sm text-gray-700"
              >
                Half Day Leave
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional comments..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeave;
