import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Employeeadd = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.state ? true : false;
  const existingData = location.state || {};

  const [formData, setFormData] = useState({
    employee_name: "",
    employee_Id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: null, 
  });

  useEffect(() => {
    if (isEdit) {
      setFormData(existingData);
    }
  }, [isEdit, existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0]; 
  if (file) {
    
    const previewURL = URL.createObjectURL(file);

    
    setFormData((prev) => ({
      ...prev,
      photo: file,        
      preview: previewURL 
    }));
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();


   const payload = new FormData();
    payload.append("employee_name", formData.employee_name);
    payload.append("employee_Id", formData.employee_Id);
    payload.append("department", formData.department);
    payload.append("designation", formData.designation);
    payload.append("project", formData.project);
    payload.append("type", formData.type);
    payload.append("status", formData.status);

    
if (formData.photo) {
      payload.append("photo", formData.photo); 
    }
    
    const url = isEdit
      ? `http://localhost:5000/api/employee/${formData.employee_Id}`
      : "http://localhost:5000/api/employee/createEmployee";

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      body: payload,
      
    })
      .then(res => res.json())
      .then(()=>navigate("/"))
      .catch(err=>console.error(err));
      }
      
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-medium mb-1">Upload Photo</label>

           <input type="file" name="photo" onChange={handleImageChange} />

          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}

           {formData.preview && (
    <img
      src={formData.preview}
      alt="Preview"
      className="w-24 h-24 mt-2 rounded-full object-cover"
    />
  )}
         
        </div>

        <input
          type="text"
          name="employee_name"
          placeholder="Enter name"
          value={formData.employee_name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="employee_Id"
          placeholder="Enter employee ID"
          value={formData.employee_Id}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
          readOnly={isEdit}
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Department</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Marketing</option>
        </select>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Designation</option>
          <option>Manager</option>
          <option>Developer</option>
          <option>Intern</option>
        </select>
        <input
          type="text"
          name="project"
          placeholder="Enter Project"
          value={formData.project}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Type</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Status</option>
          <option>Permanent</option>
          <option>Temporary</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => navigate("/employee")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isEdit ? "Update" : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Employeeadd;