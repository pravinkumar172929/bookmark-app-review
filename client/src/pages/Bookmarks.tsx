import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const Bookmarks = () => {
  const navigate = useNavigate();

  const [bookmarkValues, setBookmarkValues] = useState({
    title: "",
    url: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingBookmarkId, setEditingBookmarkId] = useState<null | string>(
    null
  );

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await fetch(
        `http://localhost:5001/api/bookmarks?search=${search}&sort=${sortOrder}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setBookmarks(data);
    };

    fetchBookmarks();
  }, [search, sortOrder]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const editingHandler = (bookmark: Bookmark) => {
    navigate(`/bookmarks/${bookmark.id}/edit`);
  };

  return (
    <>
      <Link to="/bookmarks/new">Create a bookmark</Link>
      <input
        type="text"
        placeholder="Search bookmark"
        value={search}
        onChange={searchHandler}
      />
      {bookmarks.length === 0 ? (
        <p>No bookmarks found</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <p>{bookmark.title}</p>
            <p>{bookmark.url}</p>
            <button onClick={() => editingHandler(bookmark)}>Edit</button>
          </div>
        ))
      )}

      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value as "asc" | "desc")}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </>
  );
};

export default Bookmarks;
