const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // SQL schema creation
  const createInventoryTable = `
    CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      quantity INT DEFAULT 0,
      supplier_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    );
  `;
  
  const createSuppliersTable = `
    CREATE TABLE IF NOT EXISTS suppliers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Execute the schema creation queries
  db.query(createSuppliersTable, (err, result) => {
    if (err) {
      console.error('Error creating suppliers table:', err);
      return;
    }
    console.log('Suppliers table created or already exists');
    
    db.query(createInventoryTable, (err, result) => {
      if (err) {
        console.error('Error creating inventory table:', err);
        return;
      }
      console.log('Inventory table created or already exists');
      db.end();
    });
  });
});
