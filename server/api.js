const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { sqlite3 } = require('../sqlite');
const initializeAPI = async (app) => {
  app.post("/api/login", 
    [
      body('username').notEmpty().isEmail().withMessage("Invalid email format."),
      body('password').isLength({ min: 10, max: 64 }).withMessage("Password must be between 10 to 64 characters.")
    ],
    login
  );
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = [];
    errors.array().forEach((error) => {
      formattedErrors.push({ [error.param]: error.msg });
    });
    return res.status(400).json(formattedErrors);
  }

  const { username, password } = req.body;

  const user = {
    username: "Max",
    
    hashedPassword: "$2b$10$123456789012345678901uTwE3MzCGp1p/n6EhGQnzW7lqHoz2C"
  };

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const answer = `
    <h1>Authentication Successful</h1>
    <p>Welcome, ${username}!</p>
  `;

  res.send(answer);
};

module.exports = { initializeAPI };
