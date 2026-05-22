const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'admin',
  password: 'password123'
});
conn.query("SELECT * FROM users WHERE id = ?", [req.query.id], (err, rows) => {
  console.log(rows);
});