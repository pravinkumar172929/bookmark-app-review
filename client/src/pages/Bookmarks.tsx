import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const Bookmarks = () => {
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

  const bookmarkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    setBookmarkValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const bookmarkData = {
      title: bookmarkValues.title,
      url: bookmarkValues.url,
    };

    try {
      setError("");
      setLoading(true);

      const isEditing = editingBookmarkId !== null;

      const response = await fetch(
        !isEditing
          ? "http://localhost:5001/api/bookmarks"
          : `http://localhost:5001/api/bookmarks/${editingBookmarkId}`,
        {
          method: !isEditing ? "POST" : "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const editingHandler = (bookmark: Bookmark) => {
    setEditingBookmarkId(bookmark.id);

    setBookmarkValues({
      title: bookmark.title,
      url: bookmark.url,
    });
  };

  const cancelHandler = () => {
    setEditingBookmarkId(null);

    setBookmarkValues({
      title: "",
      url: "",
    });
  };

  const submitButtonText = loading
    ? editingBookmarkId
      ? "Editing Bookmark"
      : "Adding Bookmark"
    : editingBookmarkId
    ? "Edit Bookmark"
    : "Add Bookmark";

  return (
    <>
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

      <Link to="/bookmarks/new">Create a bookmark</Link>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={bookmarkValues.title}
          onChange={bookmarkHandler}
        />
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={bookmarkValues.url}
          onChange={bookmarkHandler}
        />
        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {submitButtonText}
        </button>

        {editingBookmarkId && <button onClick={cancelHandler}>Cancel</button>}
      </form>
    </>
  );
};

export default Bookmarks;
