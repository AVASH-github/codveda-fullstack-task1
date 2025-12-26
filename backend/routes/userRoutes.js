const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST add new user
router.post("/", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err); // debug
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User added", id: result.insertId });
    }
  );
});


//PUT update user
router.put("/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    }
  );
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User deleted" });
    }
  );
});

module.exports = router;
