const jwt = require("jsonwebtoken");
const config = require("config");
const mysql = require("mysql2/promise");

module.exports = async function(req, res, next) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "Vacation"
  });
  const [rows, fields] = await connection.execute(
    "SELECT * FROM users WHERE userID = ?",
    [req.user.id]
  );

  try {
    if (rows[0].isAdmin === null) {
      return res.status(400).json({errors: [{msg: "User is not Admin"}]});
    }
    next();
  } catch (err) {
    res.status(401).json({msg: "User is not Admin"});
  }
};
