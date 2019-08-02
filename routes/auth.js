const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("config");
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: "e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "wdy0hvnqcoyk2tnk",
    password: "mxecaibhl0cj2dqg",
    database: "we0wa6t45r5wzpsj",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

router.get("/", auth, async (req, res) => {
  try {
    const [results, fields] = await pool.execute(
      `SELECT * FROM users WHERE userID=?`,
      [req.user.id]
    );
    res.json(results[0]);
  } catch (err) {
    res.status(500).send("server error");
  }
});
router.post(
  "/",
  [
    check("Email", "please enter valid mail").isEmail(),
    check("password", "password is must").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {Email, password} = req.body;
    try {
      const [results, fields] = await pool.execute(
        `SELECT * FROM users WHERE Email=?`,
        [Email]
      );
      if (results <= 0) {
        return res.status(400).json({errors: [{msg: "invalid"}]});
      }
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch) {
        return res.status(400).json({errors: [{msg: "invalid"}]});
      }
      const payload = {
        user: {
          id: results[0].userID
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 36000},
        (err, token) => {
          if (err) throw err;
          res.send({token});
        }
      );
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
