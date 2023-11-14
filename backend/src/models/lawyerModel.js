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
    lawyer_id,
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
      "UPDATE lawyer SET first_name = ?, last_name = ?, phone_number = ?, email = ?, branch_of_law = ?, description = ?, rate = ?, budget = ? WHERE lawyer_id = ?";
    const values = [
      first_name,
      last_name,
      phone_number,
      email,
      branch_of_law,
      description,
      rate,
      budget,
      lawyer_id,
    ];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  deleteLawyer: async (lawyer_id) => {
    const sql = "DELETE FROM lawyer WHERE lawyer_id = ?";
    const values = [lawyer_id];

    try {
      const [result] = await database.promise().query(sql, values);
      return result.affectedRows === 1;
    } catch (err) {
      throw err;
    }
  },

  getList: async (queryParams) => {
    const sql = "SELECT lawyer_id, first_name, last_name, phone_number, email, branch_of_law, description, rate, budget FROM lawyer WHERE 1 = 1";
    const {
      first_name,
      last_name,
      email,
      branch_of_law,
      minRate,
      maxRate,
      exactRate,
      minBudget,
      maxBudget,
      exactBudget,
    } = queryParams;

    if (first_name) {
      sql += ` AND first_name = '${first_name}'`;
    }

    if (last_name) {
      sql += ` AND last_name = '${last_name}'`;
    }

    if (email) {
      sql += ` AND email = '${email}'`;
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
      const [result] = await database.promise().query(sql);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = lawyerModel;
