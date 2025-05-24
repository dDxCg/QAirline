const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createAccount, getAccountByEmail } = require("../models");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await getAccountByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
    //Bad Request
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new account
  const newAccount = await createAccount(username, email, hashedPassword);

  // Generate JWT token
  const token = jwt.sign(
    { uuid: newAccount.account_uuid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REGISTER_EXPIRATION,
    }
  );

  res.status(200).json({ message: "Register successful", token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const account = await getAccountByEmail(email);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
    //Not Found
  }

  const isPasswordMatch = await bcrypt.compare(password, account.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
    //Unauthorized
  }

  const token = jwt.sign(
    { uuid: account.account_uuid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LOGIN_EXPIRATION,
    }
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
};

module.exports = {
  register,
  login,
};
