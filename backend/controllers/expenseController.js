const db = require("../db");

// ➕ ADD EXPENSE
exports.addExpense = (req, res) => {
  const { category, amount, comments } = req.body;
  const userId = req.user.id;

  if (!category || !amount) {
    return res.status(400).json({ message: "Category and amount required" });
  }

  const now = new Date().toISOString();

  const query = `
    INSERT INTO expenses(category, amount, comments, createdAt, updatedAt, userId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [category, amount, comments || "", now, now, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error adding expense" });
    }
    res.json({ message: "Expense added successfully" });
  });
};


// 📄 GET ALL EXPENSES (latest first)
exports.getExpenses = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM expenses
    WHERE userId = ?
    ORDER BY createdAt DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching expenses" });
    }
    res.json(rows);
  });
};


// ✏️ UPDATE EXPENSE
exports.updateExpense = (req, res) => {
  const { category, amount, comments } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const now = new Date().toISOString();

  const query = `
    UPDATE expenses
    SET category = ?, amount = ?, comments = ?, updatedAt = ?
    WHERE id = ? AND userId = ?
  `;

  db.run(query, [category, amount, comments, now, id, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error updating expense" });
    }
    res.json({ message: "Expense updated successfully" });
  });
};


// ❌ DELETE EXPENSE
exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const query = `DELETE FROM expenses WHERE id = ? AND userId = ?`;

  db.run(query, [id, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error deleting expense" });
    }
    res.json({ message: "Expense deleted successfully" });
  });
};


// 📊 CATEGORY SUMMARY (for pie chart)
exports.getSummary = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT category, SUM(amount) as total
    FROM expenses
    WHERE userId = ?
    GROUP BY category
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error getting summary" });
    }
    res.json(rows);
  });
};

