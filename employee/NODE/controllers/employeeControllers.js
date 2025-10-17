const {Router} =require("express");
const Product =require("../models/employee");
const db = require('../config/db')



exports.imageUpload = async (req, res) => {
  try {
    console.log(req.file)
    res.json({
      message: "File uploaded successfully ✅",
      file: req.file, 
    });
  } catch (err) {
    res.status(500).json({ error: "File upload failed ❌" });
  }
}

//create employee//
exports.createEmployee = (req,res)=>{
  console.log(req.body,"___________")

  const reqData = {...req.body}
  
  const reqfile = {...req.file}
  const photo = reqfile.path
  const sql = `INSERT INTO EMPLOYEE (employee_name,employee_Id , department , designation , project , type, status, photo) VALUES (? ,?,?,?,?,?,?,?) `;
  db.query(sql ,[
reqData.employee_name ,reqData.employee_Id, reqData.department ,reqData.designation , reqData.project, reqData.type, reqData.status,photo], (err , result )=>{
    if (err) return res.status (500).json ({ error : err});
    res.status(201).json({msg: "Employee created successfully",result});

  });
};


//get employee //
exports.getEmployees = (req,res)=>{

 const search = req.query.search || ""; 

 console.log(search)
const sql = `
    SELECT * FROM employee
    WHERE employee_name LIKE ? 
       OR department LIKE ? 
       OR designation LIKE ? 
       OR project LIKE ?
       OR type LIKE ?
  `;

  const values = [
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
};

// GET /employee/:id
exports.getEmployeeById = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM employee WHERE employee_Id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ msg: "Employee not found" });
    res.json(result[0]); 
  });
};

//update employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { employee_name, department, designation, project, type, status, photo } = req.body;
  const sql = `UPDATE employee SET employee_name=?, department=?, designation=?, project=?, type=?, status=?, photo=? WHERE employee_Id=?`;
  db.query(sql, [employee_name, department, designation, project, type, status, photo, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "Employee not found" });
    res.json({ msg: "Updated successfully", result });
  });
};


//delete employee

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employee WHERE employee_Id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "Employee not found" });
    res.json({ msg: "Deleted successfully", result });
  });
};

exports.searchEmployees = (req, res) => {
  const search = req.body.search || ""; 

  const sql = `
    SELECT * FROM employee
    WHERE employee_name LIKE ? 
       OR department LIKE ? 
       OR designation LIKE ? 
       OR project LIKE ?
       OR type LIKE ?
  `;

  const values = [
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
};
