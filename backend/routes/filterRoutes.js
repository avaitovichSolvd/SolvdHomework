const express = require("express");
const router = express.Router();
const database = require("../db/DBkey");
const bodyparser = require("body-parser");

router.use(bodyparser.json());

router.get("/api/lawyers", async (req, res) => {
  const { name, branch_of_law, minRate, maxRate, exactRate, minBudget, maxBudget, exactBudget, orderBy } = req.query;
  let sql = "SELECT * FROM lawyer WHERE 1 = 1";

  if (name) {
    sql += ` AND name = '${name}'`;
  }

  if (branch_of_law) {
    sql += ` AND branch_of_law = '${branch_of_law}'`;
  }

  if (minRate) {
    sql += ` AND rate >= ${minRate}`;
  }

  if (maxRate) {
    sql += ` AND rate <= ${maxRate}`;
  }

  if (exactRate) {
    sql += ` AND rate = ${exactRate}`;
  }

  if (minBudget) {
    sql += ` AND budget >= ${minBudget}`;
  }

  if (maxBudget) {
    sql += ` AND budget <= ${maxBudget}`;
  }

  if (exactBudget) {
    sql += ` AND budget = ${exactBudget}`;
  }

  if (orderBy) {
    sql += ` ORDER BY ${orderBy}`;
  }

  try {
    const [results] = await database.promise().query(sql);
    return res.status(200).json({ lawyers: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
