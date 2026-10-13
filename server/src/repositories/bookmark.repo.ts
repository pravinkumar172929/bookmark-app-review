import { pool } from "../db";

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
