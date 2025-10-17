
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '',         // your DB password
  database: 'employee_db'  // your DB name
});

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('✅ Connected to MySQL DB');
  }
});

module.exports = db;

