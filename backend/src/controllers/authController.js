const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createAccount, getAccountByEmail, initProfile } = require("../models");
const { isValidEmail, isPresent } = require("../utils");
const { DBPostgre } = require("../configs");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Validate input
  if (!isPresent(username) || !isPresent(email) || !isPresent(password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  const existingUser = await getAccountByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await DBPostgre.connect();
  try {
    await client.query("BEGIN");

    const newAccount = await createAccount(
      client,
      username,
      email,
      hashedPassword
    );
    await initProfile(client, newAccount.account_uuid);

    await client.query("COMMIT");

    res.status(200).json({ message: "Register successful" });
  } catch (error) {
    console.error("Registration error:", error);
    if (client) {
      await client.query("ROLLBACK");
    }
    return res.status(500).json({ message: "Registration failed" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //Validate input
  if (!isPresent(email) || !isPresent(password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const account = await getAccountByEmail(email);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, account.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const role = account.role || "passenger";

  const token = jwt.sign(
    { uuid: account.account_uuid, role: role },
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

const guest = async (req, res) => {
  const guestUuid = `guest-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
  // Generate a guest token
  const token = jwt.sign(
    { uuid: guestUuid, role: "guest" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_GUEST_EXPIRATION,
    }
  );
  res.status(200).json({
    message: "Guest access granted",
    token,
  });
};

module.exports = {
  register,
  login,
  guest,
};
