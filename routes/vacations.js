const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");
const admin = require("../middleware/admin");

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: "e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "wdy0hvnqcoyk2tnk",
    password: "mxecaibhl0cj2dqg",
    database: "we0wa6t45r5wzpsj",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
    dateStrings: true
  });
})();

router.get("/", auth, async (req, res) => {
  try {
    const [vacations, fields] = await pool.execute(`SELECT * FROM vacations`);
    res.json(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    auth,
    admin,

    [
      check("Descripe", "Description is required")
        .not()
        .isEmpty(),
      check("startDate", " date is required")
        .not()
        .isEmpty(),
      check("endDate", " date is required")
        .not()
        .isEmpty(),

      check("Price", "Price is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {Descripe, Img, startDate, endDate, Price} = req.body;
    try {
      await pool.execute(
        `INSERT INTO vacations ( Descripe,Img,startDate, endDate,Price,Followers) 
          VALUES (?,?,?,?,?,0);`,
        [Descripe, Img, startDate, endDate, Price]
      );
      res.send({
        status: "success",
        vacation: {
          Descripe,
          Img,
          startDate,
          endDate,
          Price
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const [results] = await pool.execute(
      `DELETE FROM vacations WHERE vacationID=?`,
      [req.params.id]
    );
    res.send({status: "success", deletedId: req.params.id});

    // Check user
    if (!results) {
      return res.status(404).json({msg: "vacation not found"});
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({msg: "vacation not found"});
    }

    res.status(500).send("Server Error");
  }
});
router.put("/:id", [auth, admin], async (req, res) => {
  try {
    const [existingVacation] = await pool.execute(
      `SELECT * from vacations
        WHERE vacationID=?`,
      [req.params.id]
    );
    const changes = req.body;

    const returnedTarget = Object.assign(existingVacation[0], changes);

    if (!existingVacation) {
      res.status(400);
      res.send(`vacation ${id} doesn\'t exist!`);
      return;
    }

    const [results] = await pool.execute(
      `UPDATE vacations SET
        Descripe = ?,
        Img = ?,
        startDate = ?,
        endDate = ?,
        Price = ?
        WHERE vacationID=?`,
      [
        changes[0].Descripe,
        changes[0].Img,
        changes[0].startDate,
        changes[0].endDate,
        changes[0].Price,
        req.params.id
      ]
    );

    res.send(changes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found"});
    }

    res.status(500).send("Server Error");
  }
});

router.get("/follow", auth, async (req, res) => {
  try {
    const [vacations, fields] = await pool.execute(
      `SELECT vacations.* from vacations
        INNER JOIN following on following.vacationID = vacations.vacationID
        WHERE following.userID = ?`,
      [req.user.id]
    );
    res.json(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const [vacation, fields] = await pool.execute(
      `SELECT * FROM vacations WHERE vacationID=?`,
      [req.params.id]
    );
    res.json(vacation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /vacations/follow/:id
// @desc    Follow a vacation
// @access  Private
router.put("/follow/:id", auth, async (req, res) => {
  try {
    const [vacation] = await pool.execute(
      `SELECT * FROM vacations WHERE vacationID=?`,
      [req.params.id]
    );
    const [likedVacation] = await pool.execute(
      "SELECT * FROM following WHERE userID = ? AND vacationID = ?",
      [req.user.id, vacation[0].vacationID]
    );
    if (likedVacation.length === 0) {
      await pool.execute(
        `INSERT INTO following (userID, vacationID) VALUES (?, ?);`,
        [req.user.id, vacation[0].vacationID]
      );

      if (vacation[0].followers === null) {
        await pool.execute(
          `UPDATE vacations SET followers=? WHERE vacationID=?`,
          [1, req.params.id]
        );
      } else {
        await pool.execute(
          `UPDATE vacations SET followers=? WHERE vacationID=?`,
          [vacation[0].followers + 1, req.params.id]
        );
        console.log(`${vacation[0].followers + 1} added`);
      }

      res.send({
        status: "success"
      });
    } else {
      return res
        .status(400)
        .json({errors: [{msg: "Vacation already followed by user"}]});
    }
  } catch (err) {
    res.status(404).json({errors: [{msg: "Vacation not found"}]});
  }
});

// @route   PUT /unfollow/:id
// @desc    Unike a post
// @access  Private
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const [likedVacations] = await pool.execute(
      "DELETE from following WHERE vacationID = ? and userID = ?",
      [req.params.id, req.user.id]
    );

    if (likedVacations.affectedRows > 0) {
      const [vacation] = await pool.execute(
        `SELECT * FROM vacations WHERE vacationID=?`,
        [req.params.id]
      );
      res.send("deleted ");
      await pool.execute(
        `UPDATE vacations SET followers=? WHERE vacationID=?`,
        [vacation[0].followers - 1, req.params.id]
      );
      console.log(`${vacation[0].followers - 1} followers`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).json({msg: "vacation not found"});
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const [vacation] = await pool.execute(
      `DELETE  FROM vacations WHERE vacationID=?`,
      [req.params.id]
    );

    res.json("delete");
  } catch (error) {
    console.error("hi", error);
  }
});

module.exports = router;
