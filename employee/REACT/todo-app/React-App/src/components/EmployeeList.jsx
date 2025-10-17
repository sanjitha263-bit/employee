// EmployeeList.jsx
import { useEffect, useState } from "react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/employee/getEmployee")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees(); // automatically runs when page loads
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.employee_Id}>{emp.employee_name}</li>
        ))}
      </ul>
    </div>
  );
}
