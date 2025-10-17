const {Router} =require("express");
const Product =require("../models/employee");
const db = require('../config/db')

// //postProduct

// exports.CreateProduct = async (req , res)=>{
//     try{
//         const  { name,price,category,quantity } = req.body;
//         let product = await Product.findOne({name});
//         if (product){
//             return res.status(400).json({msg: "Product already exist"});
//     }
//         product = new Product({
//             name,
//             price,
//             category,
//             quantity
//         });
//         await product.save();
//         res.status(201).json({msg: "Product created successfully",product});

//         }catch (err){
//             res.status(500).json({msg: err.message });

//         }
//     };

//     //getProduct

//     exports.getProduct = async (req , res) =>{
//         try{
//             const product = await Product.find();
//             res.json(product);
//         } catch (err){
//             res.status(500).json({msg: err.message});
//         }
//     };

//     //putProduct

//     exports.updateProduct = async (req,res)=>{
//   try{
//     const { id } = req.params;
//     const {name , price, quantity , category} = req.body;
//      let product = await Product .updateOne({ _id : id },{$set:{ name ,price , quantity, category}});
//      if (!product.matchedCount) return res.status(400).json({ msg: "Product  does not update " });
//      return res.status(200).json({ msg: " Updateted Successfully",product });
// } catch(err){
//     res.status(500).json({msg: err.message});
//   }
// };








// //deleteProduct


// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let product = await Product.deleteOne({ _id: id });

//     if (product.deletedCount === 0) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     return res.status(200).json({ msg: "Deleted Successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


exports.imageUpload = async (req, res) => {
  try {
    console.log(req.file)
    res.json({
      message: "File uploaded successfully ✅",
      file: req.file, // file details
    });
  } catch (err) {
    res.status(500).json({ error: "File upload failed ❌" });
  }
}

//create employee//
exports.createEmployee = (req,res)=>{
  console.log(req.body,"___________")

  const reqData = {...req.body}
  // const{employee_name, employee_Id , department, designation , project , type, status} = req.body;
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


  // const sql ="SELECT * FROM employee";
  // db.query(sql, (err, result )=>{
  //  if (err) return res.status (500).json ({error :err});
  //  res.json(result);
  // });
 const search = req.query.search || ""; // example: /api/employee?search=dev

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


// exports.searchEmployees = (req, res) => {
//   const search = req.body.search || ""; // query param ?search=

//   // If search given → filter by name or department
//   const sql = `SELECT * FROM employee WHERE employee_name LIKE ? OR department LIKE ? OR designation LIKE ? OR project LIKE ? OR type LIKE`;
//   const values = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`,`%${search}%`];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(result);
//   });
// };

exports.searchEmployees = (req, res) => {
  const search = req.body.search || ""; // example: /api/employee?search=dev

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
