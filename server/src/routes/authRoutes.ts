import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.post("/signup", async (req, res) => {
  console.log("req body => ", req.body);
  //   res.send("signup request");
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json("Email and password are required");
    return;
  }

  const result = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  console.log(result.rows);

  if (result.rows.length > 0) {
    res.status(409).json("Email already exists");
    return;
  }

  res.status(200).json("Validation passed");
});

export default router;
