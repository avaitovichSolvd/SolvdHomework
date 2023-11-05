const database = require("../../db/DBkey");

const lawyerModel = {
  addLawyer: async (
    first_name,
    last_name,
    phone_number,
    email,
    branch_of_law,
    description,
    rate,
    budget
  ) => {
    const sql =
      "INSERT INTO lawyer (first_name, last_name, phone_number, email, branch_of_law, description, rate, budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      first_name,
      last_name,
      phone_number,
      email,
      branch_of_law,
      description,
      rate,
      budget,
    ];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  updateLawyer: async (
    id,
    first_name,
    last_name,
    phone_number,
    email,
    branch_of_law,
    description,
    rate,
    budget
  ) => {
    const sql =
      "UPDATE lawyer SET first_name = ?, last_name = ?, phone_number = ?, email = ?, branch_of_law = ?, description = ?, rate = ?, budget = ? WHERE id = ?";
    const values = [
      first_name,
      last_name,
      phone_number,
      email,
      branch_of_law,
      description,
      rate,
      budget,
      id,
    ];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  deleteLawyer: async (id) => {
    const sql = "DELETE FROM lawyer WHERE id = ?";
    const values = [id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = lawyerModel;
