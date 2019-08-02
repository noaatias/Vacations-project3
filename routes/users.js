const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("config");
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
router.get("/", async (req, res) => {
  const [results, fields] = await pool.execute(`SELECT * FROM users`);

  res.send(results);
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("userName", "Name is required")
      .not()
      .isEmpty(),
    check("lastName", "Name is required")
      .not()
      .isEmpty(),
    check("Email", "Please include a valid email").isEmail()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {userName, lastName, Email, password} = req.body;

    user = {
      userName,
      lastName,
      Email,
      password
    };

    try {
      const [results, fields] = await pool.execute(
        `SELECT * FROM users
      WHERE Email=?`,
        [Email]
      );

      if (results.length > 0) {
        return res.status(400).json({errors: [{msg: "User already exists"}]});
      }

      const salt = await bcrypt.genSalt(10);

      hashPassword = await bcrypt.hash(password, salt);

      await pool.execute(
        `INSERT INTO users (userName, lastName, Email, password,isAdmin) VALUES (?, ?, ?, ?,0);`,
        [userName, lastName, Email, hashPassword]
      );
      const [user] = await pool.execute(`SELECT * FROM users WHERE Email=?`, [
        Email
      ]);
      // res.send({ status: 'success', firstName: firstName, user: user });

      const payload = {
        user: {
          id: user[0].userID
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 36000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
