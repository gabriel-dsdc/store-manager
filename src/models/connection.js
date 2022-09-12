const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST || 'db',
port: process.env.DATABASE_PORT || 3306,
user: process.env.DATABASE_USER || 'root',
password: process.env.DATABASE_PASSWORD || 'password',
database: process.env.DATABASE_NAME || 'StoreManager',
});

module.exports = connection;
