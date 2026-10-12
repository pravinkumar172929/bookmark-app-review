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

bookmarkRouter.get("/", requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const search = typeof req.query.search === "string" ? req.query.search : "";

  logger.info({ search }, "Search parameter received");

  logger.info({ userId }, "Fetching bookmarks for user");

  try {
    const result = await pool.query(
      "SELECT id, title, url, created_at FROM bookmarks WHERE user_id =$1 AND title ILIKE $2",
      [userId, `%${search}%`]
    );

    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    const userBookmarks = result.rows;

    logger.info(userBookmarks);
    return res.status(200).json(userBookmarks);
  } catch (error) {
    logger.error({}, "bookmark fetching failed");
    return res.status(500).json("Something went wrong");
  }
});

export default bookmarkRouter;
