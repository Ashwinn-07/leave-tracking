import React, { useState } from "react";
import { Calendar, Plus, Edit2, Trash2 } from "lucide-react";

const existingHolidays = [
  {
    id: "1",
    name: "New Year's Day",
    date: "2024-01-01",
  },
  {
    id: "2",
    name: "Independence Day",
    date: "2024-07-04",
  },
  {
    id: "3",
    name: "Christmas Day",
    date: "2024-12-25",
  },
];

const Holidays = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [holidays, setHolidays] = useState(existingHolidays);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setHolidays(
        holidays.map((holiday) =>
          holiday.id === editingId ? { ...holiday, ...formData } : holiday
        )
      );
      setEditingId(null);
    } else {
      setHolidays([...holidays, { id: String(Date.now()), ...formData }]);
    }
    setShowForm(false);
    setFormData({ name: "", date: "" });
  };

  const handleEdit = (holiday: (typeof existingHolidays)[0]) => {
    setFormData({ name: holiday.name, date: holiday.date });
    setEditingId(holiday.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setHolidays(holidays.filter((holiday) => holiday.id !== id));
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">Holidays</h1>
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", date: "" });
                setShowForm(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Holiday
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holiday Name
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
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({ name: "", date: "" });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingId ? "Update Holiday" : "Add Holiday"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holiday Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holidays.map((holiday) => (
                  <tr key={holiday.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {holiday.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {holiday.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(holiday)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(holiday.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
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

export default Holidays;
