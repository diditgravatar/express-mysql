const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Read and display items
router.get("/", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("index", { items: results });
  });
});

// Create item
router.post("/add", (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Update item
router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = "UPDATE items SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Delete item
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM items WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
