const express = require("express");
const router = express.Router();
const database = require("../db/DBkey");
const bodyparser = require("body-parser");

router.use(bodyparser.json());

const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "User ID must be provided" });
    }

    const deleteQuery = "DELETE FROM user WHERE username = ?";
    const [results] = await database.promise().query(deleteQuery, [username]);

    if (results.affectedRows === 1) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Operation has failed" });
  }
};

const addToCart = async (req, res) => {
  const { username, lawyer_id } = req.body;

  if (!username || !lawyer_id) {
    return res
      .status(400)
      .json({ error: "username and lawyer_id are required" });
  }

  try {
    const [results] = await database
      .promise()
      .query("INSERT INTO user_cart (username, lawyer_id) VALUES (?, ?)", [
        username,
        lawyer_id,
      ]);

    if (results.affectedRows === 1) {
      console.log("Lawyer profile added to the cart");
      return res
        .status(200)
        .json({ message: "Lawyer profile added to the cart" });
    } else {
      console.error("Error adding to cart: No rows affected");
      return res.status(500).json({ error: "Error adding to cart" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Error adding to cart", details: error.message });
  }
};

const viewCart = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: 'Username is required to view the cart',  });
  }

  try {
    const [results] = await database.promise().query(
      'SELECT l.id_lawyer, l.name, l.branch_of_law, l.description, l.rate, l.budget FROM user_cart uc JOIN lawyer l ON uc.lawyer_id = l.id_lawyer WHERE uc.username = ?',
      [username]
    );

    if (results.length > 0) {
      const cartItems = results;
      return res.status(200).json({ cart: cartItems });
    } else {
      return res.status(404).json({ message: 'The cart is empty' });
    }
  } catch (error) {
    console.error('Error viewing cart:', error);
    return res.status(500).json({ error: 'Error viewing cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { username, lawyer_id } = req.body;

    if (!username || !lawyer_id) {
      return res.status(400).json({ error: 'Both username and lawyer_id are required' });
    }

    const result = await new Promise((resolve, reject) => {
      database.query(
        'DELETE FROM user_cart WHERE username = ? AND lawyer_id = ?',
        [username, lawyer_id],
        (error, results) => {
          if (error) {
            console.error('Error removing lawyer profile from cart:', error);
            reject('Error removing lawyer profile from cart');
          } else if (results.affectedRows === 0) {
            reject('Lawyer profile not found in the cart');
          } else {
            resolve('Lawyer profile successfully removed from the cart');
          }
        }
      );
    });

    return res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Operation has failed' });
  }
};


router.delete("/api/DeleteUser/:username", deleteUser);
router.post("/api/AddToCart", addToCart);
router.get("/api/ViewCart/:username", viewCart);
router.delete("/api/RemoveFromCart", removeFromCart);

module.exports = router;
