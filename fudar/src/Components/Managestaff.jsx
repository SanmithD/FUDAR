import axios from 'axios';
import { useEffect, useState } from 'react';

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  const getAllStaffs = async () => {
    try {
      const response = await axios.get('https://fudar-dqqd.onrender.com/api/user/getAllStaff');
      const users = response.data.data || []; 
      setStaff(users); 
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getAllStaffs();
  }, []);

  const handleDelete = (staffId) => {
    setStaff(staff.filter(member => member._id !== staffId));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Staff List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {staff.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No staff members found
        </div>
      )}
    </div>
  );
};

export default StaffList;