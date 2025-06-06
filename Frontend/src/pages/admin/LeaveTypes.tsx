import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "../../stores/authStore";
import { showError, showSuccess } from "../../utils/notifications";
import type { ILeaveType } from "../../types/leaveType";

interface LeaveTypesResponse {
  message: string;
  data: ILeaveType[];
}

const LeaveTypes = () => {
  const { fetchTypes, createType } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxDays: 0,
    accrualRate: 0,
    halfDayAllowed: false,
  });
  const [leaveTypes, setLeaveTypes] = useState<ILeaveType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const loadLeaveTypes = async () => {
      try {
        setLoading(true);
        const response = (await fetchTypes()) as unknown as LeaveTypesResponse;
        setLeaveTypes(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to load leave types");
        showError("Failed to load leave types");
      } finally {
        setLoading(false);
      }
    };

    loadLeaveTypes();
  }, [fetchTypes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createType(formData);
      showSuccess("Leave type created successfully");

      const response = (await fetchTypes()) as unknown as LeaveTypesResponse;
      setLeaveTypes(Array.isArray(response.data) ? response.data : []);

      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        maxDays: 0,
        accrualRate: 0,
        halfDayAllowed: false,
      });
    } catch (error: any) {
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create leave type";
      showError(errMsg);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leaveTypes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Leave Types</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showForm ? "Close Form" : "Add Leave Type"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Days
                    </label>
                    <input
                      type="number"
                      value={formData.maxDays || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxDays: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accrual Rate (days/month)
                    </label>
                    <input
                      type="number"
                      value={formData.accrualRate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accrualRate: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="halfDayAllowed"
                      checked={formData.halfDayAllowed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          halfDayAllowed: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="halfDayAllowed"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Allow Half Day
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    Save Leave Type
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="p-6">
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading leave types...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Accrual Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Half Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No leave types found
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((leaveType: any) => (
                      <tr key={leaveType.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {leaveType.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {leaveType.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {leaveType.maxDays}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {leaveType.accrualRate}/month
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {leaveType.halfDayAllowed ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 disabled:opacity-50 cursor-pointer">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {leaveTypes.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstItem + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(indexOfLastItem, leaveTypes.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">{leaveTypes.length}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              currentPage === number
                                ? "bg-blue-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                            }`}
                          >
                            {number}
                          </button>
                        ))}

                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 cursor-pointer"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRight
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveTypes;
