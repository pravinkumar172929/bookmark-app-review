import { insertBookmark } from "../repositories/bookmark.repo";

export const createBookmark = async (
  userId: string,
  title: string,
  url: string
) => {
  if (!title || !url) {
    throw new Error("Title and URL are required");
  }

  return insertBookmark(userId, title, url);
};
