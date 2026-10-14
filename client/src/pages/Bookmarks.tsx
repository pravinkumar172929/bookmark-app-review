import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const Bookmarks = () => {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await fetch(
        `http://localhost:5001/api/bookmarks?search=${search}&sort=${sortOrder}&page=${page}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setBookmarks(data.bookmarks);
      setTotalPages(data.pagination.totalPages);
    };

    fetchBookmarks();
  }, [search, sortOrder, page]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
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

      <select
        value={sortOrder}
        onChange={(event) => {
          setSortOrder(event.target.value as "asc" | "desc");
          setPage(1);
        }}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

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
      <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </Button>
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </>
  );
};

export default Bookmarks;
