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
  const sort = req.query.sort === "asc" ? "ASC" : "DESC";
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * 10;

  logger.info({ search }, "Search parameter received");

  logger.info({ sort }, "Sort parameter");

  logger.info({ userId }, "Fetching bookmarks for user");
  logger.info({ page }, "Page parameter");

  try {
    const result = await pool.query(
      `SELECT id, title, url, created_at 
      FROM bookmarks 
      WHERE user_id =$1 AND title ILIKE $2 
      ORDER BY created_at ${sort} LIMIT 10 OFFSET 10`,
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

bookmarkRouter.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const userId = req.session.userId;

  try {
    const result = await pool.query(
      "UPDATE bookmarks SET title = $1, url = $2 WHERE id = $3 AND user_id =$4 RETURNING id, title, url, created_at",
      [title, url, id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("Bookmark not found");
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error({}, "bookmark update failed");
    return res.status(500).json("Something went wrong");
  }
});

bookmarkRouter.get("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const result = await pool.query(
      "SELECT id, title, url, created_at FROM bookmarks WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("Bookmark not found");
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error({ error, id, userId }, "Bookmark fetching failed");
    return res.status(500).json("Something went wrong");
  }
});

export default bookmarkRouter;
