// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// MySQL connection setup
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
});

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests only from your Angular app
}));

// Inventory API Endpoints
app.get('/api/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/inventory', (req, res) => {
  const { name, category, quantity, supplier_id } = req.body;
  db.query(
    'INSERT INTO inventory (name, category, quantity, supplier_id) VALUES (?, ?, ?, ?)',
    [name, category, quantity, supplier_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: results.insertId,
        name,
        category,
        quantity,
        supplier_id,
      });
    }
  );
});

app.get('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM inventory WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(result[0]);
  });
});

app.put('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, supplier_id } = req.body;

  db.query(
    'UPDATE inventory SET name = ?, category = ?, quantity = ?, supplier_id = ? WHERE id = ?',
    [name, category, quantity, supplier_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item updated successfully' });
    }
  );
});

app.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM inventory WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  });
});

// Supplier API Endpoints
app.get('/api/suppliers', (req, res) => {
  db.query('SELECT * FROM suppliers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/suppliers', (req, res)  => {
  const { name, contact } = req.body;
  db.query(
    'INSERT INTO suppliers (name, contact) VALUES (?, ?)',
    [name, contact],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: results.insertId,
        name,
        contact,
      });
    }
  );
});

app.get('/api/suppliers/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM suppliers WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Supplier not found' });
    res.json(result[0]);
  });
});

app.put('/api/suppliers/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  db.query(
    'UPDATE suppliers SET name = ?, contact = ? WHERE id = ?',
    [name, contact, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Supplier not found' });
      res.json({ message: 'Supplier updated successfully' });
    }
  );
});

app.delete('/api/suppliers/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM suppliers WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
