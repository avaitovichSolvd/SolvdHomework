const express = require("express");
const router = express.Router();
const database = require("../db/DBkey");
const bodyparser = require("body-parser");

router.use(bodyparser.json());

const addLawyer = async (req, res) => {
  try {
    const { name, branch_of_law, description, rate, budget } = req.body;

    if (!name || !branch_of_law || !rate || !budget) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const newLawyer =
      "INSERT INTO lawyer (name, branch_of_law, description, rate, budget) VALUES (?, ?, ?, ?, ?)";
    const [results] = await database
      .promise()
      .query(newLawyer, [name, branch_of_law, description, rate, budget]);

    if (results.affectedRows === 1) {
      return res
        .status(201)
        .json({ message: "Operation to add a new lawyer was successful" });
    } else {
      return res
        .status(500)
        .json({ error: "Operation to add a new lawyer failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

const updateLawyer = async (req, res) => {
  try {
    const { id_lawyer } = req.params;
    const { name, branch_of_law, description, rate, budget } = req.body;

    if (!id_lawyer || !name || !branch_of_law || !rate || !budget) {
      return res.status(400).json({ error: "All fields must be filled in" });
    }

    const updateQuery = "UPDATE lawyer SET name = ?, branch_of_law = ?, description = ?, rate = ?, budget = ? WHERE id_lawyer = ?";
    const [results] = await database.promise().query(updateQuery, [name, branch_of_law, description, rate, budget, id_lawyer]);

    if (results.affectedRows === 1) {
      return res.status(200).json({ message: "Lawyer profile updated" });
    } else {
      return res.status(404).json({ error: "Lawyer not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

const deleteLawyer = async (req, res) => {
  try {
    const { id_lawyer } = req.params;

    if (!id_lawyer) {
      return res.status(400).json({ error: "Lawyer ID must be provided" });
    }

    const deleteQuery = "DELETE FROM lawyer WHERE id_lawyer = ?";
    const [results] = await database.promise().query(deleteQuery, [id_lawyer]);

    if (results.affectedRows === 1) {
      return res.status(200).json({ message: "Lawyer deleted successfully" });
    } else {
      return res.status(404).json({ error: "Lawyer not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

router.post("/api/AddLawyer", addLawyer);
router.put("/api/UpdateLawyer/:id_lawyer", updateLawyer);
router.delete("/api/DeleteLawyer/:id_lawyer", deleteLawyer);

module.exports = router;
