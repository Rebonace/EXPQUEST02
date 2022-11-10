require("dotenv").config();

const mysql = require("mysql2/promise");

// Notice the /promise : we will use the promise version of the module. If you're curious, ask your instructor for a demo of the callback version during a live coding ;)
const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = database;
