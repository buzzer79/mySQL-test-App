const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sakila",
    password: process.env.DB_PASS
});

module.exports = pool.promise();