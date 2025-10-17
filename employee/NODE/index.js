const express = require("express");  // framework pre definedfunctions //
const dotenv = require("dotenv");    //credencials secure like mongoDb,port//
const connectDB = require("./config/db"); //mongo Db connect //
const Employee = require("./routes/EmployeeRoutes");
const cors = require("cors");  //front end 3000 port backend 5000 hnadle blocks in server //

const db = require('./config/db');

// ✅ Initialize CORS (Allow all origins by default)

dotenv.config(); //env la irruka environmental variables load panrathuku like a(url,port,db)//
// connectDB(); //db ah connect //

const app = express();// backend run aagum //
app.use(express.json()); //frontend la irrundhu vara json data va bacckend ku read panna help pannu //
app.use(cors()); //

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Routes
app.use("/api/employee", Employee)



const PORT = process.env.PORT || 5000; //server indha port la run aaganumnu solrolm //
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //eg: http://localhost:5000 //
