const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "post",
  port: 5432,
  database: "dindin",
});

module.exports = pool;
