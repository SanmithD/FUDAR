import React, { useState } from 'react';

function AddDriver() {
    const [newDriver, setNewDriver] = useState({
        name: "",
        licenseNumber: "",
        contact: "",
        joinedDate: new Date().toISOString().split("T")[0],
        salaryStatus: "unpaid",
      });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Driver</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={newDriver.name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, name: e.target.value })
                }
                 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                License Number
              </label>
              <input
                type="text"
                value={newDriver.licenseNumber}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Contact
              </label>
              <input
                type="text"
                value={newDriver.contact}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, contact: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Joined Date
              </label>
              <input
                type="date"
                value={newDriver.joinedDate}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, joinedDate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Salary Status
              </label>
              <select
                value={newDriver.salaryStatus}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, salaryStatus: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddDriverModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
  )
}

export default AddDriver