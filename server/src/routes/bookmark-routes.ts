import { Router } from "express";
import { pool } from "../db";
import requireAuth from "../middleware/requireAuth";

const bookmarkRouter = Router();

bookmarkRouter.post("/", requireAuth, async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    res.status(400).json("Title and url are required");
    return;
  }

  const userId = req.session.userId;

  try {
    const addedBookmark = await pool.query(
      "INSERT INTO bookmarks (user_id, title, url) VALUES ($1, $2, $3) RETURNING id, user_id, title, url, created_at",
      [userId, title, url]
    );

    return res.status(201).json(addedBookmark.rows[0]);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

export default bookmarkRouter;
