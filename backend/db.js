const mysql = require("mysql2");

// Create connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // XAMPP default
  password: "",        // XAMPP default
  database: "codveda_db"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL connected");
});

module.exports = db;
