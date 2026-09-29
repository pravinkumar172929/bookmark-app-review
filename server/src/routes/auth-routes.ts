import { Router } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import logger from "../logger";

const router = Router();

router.post("/signup", async (req, res) => {
  logger.info("Signup request received");
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Signup request missing required fields");
    res.status(400).json("Email and password are required");
    return;
  }

  try {
    const result = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      logger.warn("Signup attempted with existing email");
      res.status(409).json("Email already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const addedUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword]
    );

    logger.info("User signup successful");
    return res.status(201).json(addedUser.rows[0]);
  } catch (error) {
    logger.error(error, "Signup failed");
    return res.status(500).json("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  logger.info("Login request received");
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Login request missing required fields");
    res.status(400).json("Email and password are required");
    return;
  }

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json("Invalid email or password");
    }

    const hashedPassword = result.rows[0].password;

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      logger.warn("Login failed due to invalid credentials");
      return res.status(401).json("Invalid email or password");
    }

    logger.info("User login successful");
    return res.status(200).json("Login successful");
  } catch (error) {
    logger.error(error, "Login failed");
    return res.status(500).json("Something went wrong");
  }
});

export default router;
