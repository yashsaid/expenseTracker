const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/authMiddleware");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;

    db.run(query, [name, email, hashedPassword], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint")) {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Error registering user" });
      }
      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Bcrypt error:", error);
    return res.status(500).json({ message: "Error processing password" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (error) {
      console.error("Bcrypt compare error:", error);
      return res.status(500).json({ message: "Error verifying password" });
    }
  });
};

// GET USER INFO
exports.getUserInfo = (req, res) => {
  // User info is already in req.user from authMiddleware
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name
  });
};
