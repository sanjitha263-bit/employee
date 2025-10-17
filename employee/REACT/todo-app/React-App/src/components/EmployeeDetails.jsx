import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/employee/getEmployeeById/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => console.error(err));
  }, [id]);

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
          <h2 className="text-2xl font-bold">View Employee Details</h2>
        </div>

        <div className="border-b border-gray-300 mb-4">
          <div className="text-blue-600 font-semibold pb-2 border-b-2 border-blue-600 w-fit">
            Personal Information
          </div>
        </div>

        <div className="flex items-start gap-8">
          <img
            src={employee.photo || 'https://via.placeholder.com/100'}
            alt={employee.employee_name}
            className="w-24 h-24 rounded-md object-cover"
          />

          <div className="grid grid-cols-2 gap-y-6 gap-x-12 w-full text-sm">
            <div>
              <p className="text-gray-500 mb-1">Name</p>
              <p className="font-medium">{employee.employee_name || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Employee ID</p>
              <p className="font-medium">{employee.employee_Id || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Department</p>
              <p className="font-medium">{employee.department || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Designation</p>
              <p className="font-medium">{employee.designation || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Project</p>
              <p className="font-medium">{employee.project || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Type</p>
              <p className="font-medium">{employee.type || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p className="font-medium">{employee.status || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
