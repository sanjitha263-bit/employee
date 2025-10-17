import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employee_name: '',
    employee_Id: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: '',
    photo: '',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/employee/getEmployeeById/${id}`,{ method: "GET"})
     
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/employee/updateEmployee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        alert('Employee updated successfully!');
        navigate('/'); // Or wherever you want to go
      })
      .catch((err) => console.error(err));
  };

//   const handleImageChange = (e) => {
//   const file = e.target.files[0]; // user select pannina first file
//   if (file) {
//     // 1️⃣ Preview (frontend)
//     const previewURL = URL.createObjectURL(file);

//     // 2️⃣ Save both file + preview in state
//     setFormData((prev) => ({
//       ...prev,
//       photo: file,        // backend ku send panna actual file
//       preview: previewURL // frontend la preview kaattanum
//     }));
//   }
// };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow rounded-lg p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl mr-4 font-semibold hover:text-blue-600"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold">Edit Employee Details</h2>
        </div>

        <div className="text-blue-600 font-semibold border-b-2 border-blue-600 w-fit mb-6">
          Personal Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <img
                src={employee.photo || 'https://via.placeholder.com/100'}
                alt="Employee"
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
                ✏️
              </div>
            </div>
          </div>

          {/* Empty placeholder to align fields */}
          <div></div>

          {/* Form fields */}
          <div>
            <label className="text-sm font-semibold">Name*</label>
            <input
              name="employee_name"
              value={employee.employee_name}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Employee ID*</label>
            <input
              name="employee_Id"
              value={employee.employee_Id}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Department*</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Designation*</label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Design Lead">Design Lead</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Project</label>
            <input
              name="project"
              value={employee.project}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Type*</label>
            <select
              name="type"
              value={employee.type}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Status*</label>
            <select
              name="status"
              value={employee.status}
              onChange={handleChange}
              className="border mt-1 w-full p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDetails;
