import { Router } from "express";
import { pool } from "../db";
import requireAuth from "../middleware/requireAuth";
import logger from "../logger";

const bookmarkRouter = Router();

bookmarkRouter.post("/", requireAuth, async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    logger.warn("bookmark request missing required fields");
    res.status(400).json("Title and url are required");
    return;
  }

  const userId = req.session.userId;
  logger.info(userId);

  try {
    const addedBookmark = await pool.query(
      "INSERT INTO bookmarks (user_id, title, url) VALUES ($1, $2, $3) RETURNING id, user_id, title, url, created_at",
      [userId, title, url]
    );

    logger.info({ userId }, "Bookmark creation successful");
    return res.status(201).json(addedBookmark.rows[0]);
  } catch (error) {
    logger.error({ error, userId }, "bookmark creation failed");
    return res.status(500).json("Something went wrong");
  }
});

export default bookmarkRouter;
