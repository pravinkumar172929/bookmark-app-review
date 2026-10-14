import { pool } from "../db";
import logger from "../logger";

export const insertBookmark = async (
  userId: string,
  title: string,
  url: string
) => {
  const result = await pool.query(
    `INSERT INTO bookmarks (user_id, title, url)
         VALUES ($1, $2, $3)
          RETURNING id, user_id, title, url, created_at`,
    [userId, title, url]
  );

  return result.rows[0];
};

export const findBookmarksByUser = async (
  userId: string,
  search: string,
  sort: "ASC" | "DESC",
  limit: number,
  offset: number
) => {
  const result = await pool.query(
    `SELECT id, title, url, created_at 
      FROM bookmarks 
      WHERE user_id =$1 AND title ILIKE $2 
      ORDER BY created_at ${sort} 
      LIMIT $3 OFFSET $4`,
    [userId, `%${search}%`, limit, offset]
  );

  logger.info(
    { bookmarks: result.rows, count: result.rowCount },
    "Bookmarks fetched from database"
  );

  return result.rows;
};

export const countBookmarksByUser = async (userId: string, search: string) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM bookmarks
      WHERE user_id = $1 AND title ILIKE $2`,
    [userId, `%${search}%`]
  );

  logger.info({ result }, "bookmark count");

  return result.rows[0].count;
};
