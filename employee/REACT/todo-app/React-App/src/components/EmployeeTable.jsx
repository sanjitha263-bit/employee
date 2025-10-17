import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  //  useEffect(() => {
  //   fetchEmployees();
  // }, [searchTerm]); // Triggers when searchTerm changes

useEffect(() => {
  const delay = setTimeout(() => {
    fetchEmployees();
  }, 500); // wait 500ms after typing stops

  return () => clearTimeout(delay); // cleanup
}, [searchTerm]);
 
    const fetchEmployees = async () => {


    fetch(`http://localhost:5000/api/employee/getEmployee?search=${searchTerm}`,{
    method: "GET",
    })
      .then(res => res.json())
      .then(data =>  setEmployees(data))
      
      .catch(err => console.error( err));
      
}

  

  const handleEdit = (emp) => {
    navigate(`/edit-employee/${emp.employee_Id}`, 
      { state: "edit",employee:emp });
  };

  const handleDelete = (empID) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:5000/api/employee/deleteEmployee/${empID}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          // update local state
          setEmployees((prev) =>
            prev.filter((e) => e.employee_Id !== empID)
          );
        })
        .catch((err) => {
          console.error("Delete error:", err);
        });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className='fw-bold'>Employee</h1>
       <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
        <button
          onClick={() => navigate("/add-employee")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add New Employee
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden min-w-full text-left w-full">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Employee Name</th>
              <th className="py-3 px-4">Employee ID</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              employees.map((emp, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{emp.employee_name}</td>
                  <td className="px-4 py-2">{emp.employee_Id}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.designation}</td>
                  <td className="px-4 py-2">{emp.project}</td>
                  <td className="px-4 py-2">{emp.type}</td>
                  <td className="px-4 py-2">{emp.status}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                    //  onClick={() => handleView(emp)}
                      // onClick={() => navigate("/EmployeeDetails")}
                     onClick={() => navigate(`/EmployeeDetails/${emp.employee_Id}`)}

                      title="View"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      👁️
                    </button>
                    <button
                     onClick={() => handleEdit(emp)} 
                      title="Edit"
                      className="text-green-500 hover:text-green-700"
                    >
                      ✏️
                    </button>
                      <button
                      onClick={() => handleDelete(emp.employee_Id)}
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;