const express = require("express");
const cors = require("cors");
require("./db");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
