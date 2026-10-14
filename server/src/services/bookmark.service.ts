import {
  countBookmarksByUser,
  findBookmarksByUser,
  insertBookmark,
} from "../repositories/bookmark.repo";

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

export const getBookmarks = async (
  userId: string,
  search: string,
  sort: "ASC" | "DESC",
  limit: number,
  page: number
) => {
  const offset = (page - 1) * limit;

  const userBookmarks = await findBookmarksByUser(
    userId,
    search,
    sort,
    limit,
    offset
  );

  const totalBookmarks = await countBookmarksByUser(userId, search);

  const totalPages = Math.ceil(totalBookmarks / limit);

  return {
    bookmarks: userBookmarks,
    pagination: {
      page,
      limit,
      totalBookmarks,
      totalPages,
    },
  };
};
