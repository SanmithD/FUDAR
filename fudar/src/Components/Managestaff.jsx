import { useState, useEffect } from 'react';
import { Axios } from 'axios';
const StaffList = () => {
  // Sample staff data
  const [staff, setStaff] = useState([
    { id: 1, Name: 'john_doe', phoneNumber:'xx01166xxx' },
    // { id: 2, username: 'jane_smith' },
    // { id: 3, username: 'mike_jones' },
    // { id: 4, username: 'sara_wilson' },
  ]);
  
    const getAllStaffs= async () =>
    {
      const response = await Axios.get('https://fudar-dqqd.onrender.com/api/user/getAll'); //fetch raw data from mong
      let users=response.data.response || [];
      if(users.role=="staff")
      {
        setStaff(users.details);
        console.log(users.details);
      }
      
    }
    useEffect(() => {
    getAllStaffs();
  },[]);
  // Handle delete staff member
  const handleDelete = (staffId) => {
    setStaff(staff.filter(member => member.id !== staffId));
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
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(member.id)}
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