const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const auth = require("../middleware/authMiddleware");


router.post("/", auth.authMiddleware, expenseController.addExpense);
router.get("/", auth.authMiddleware, expenseController.getExpenses);
router.put("/:id", auth.authMiddleware, expenseController.updateExpense);
router.delete("/:id", auth.authMiddleware, expenseController.deleteExpense);
router.get("/summary", auth.authMiddleware, expenseController.getSummary);

module.exports = router;
