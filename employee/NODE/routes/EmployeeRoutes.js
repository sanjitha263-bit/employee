const express = require ("express");
const {imageUpload, createEmployee, getEmployees, updateEmployee, deleteEmployee,getEmployeeById,searchEmployees} = require ("../controllers/employeeControllers");
const router = express.Router();
const upload = require('../utils/uploadConfig')

router.post("/createEmployee",upload.single("photo"),createEmployee);
router.get("/getEmployee",getEmployees);
router.get("/getEmployeeById/:id",getEmployeeById)
router.put("/updateEmployee/:id",updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.post("/uploadimage",upload.array("myFiles",5),imageUpload)
router.post("/searchEmployees",searchEmployees)


module.exports = router;
