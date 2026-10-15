import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { Input } from "../components/ui/Input/Input";
import { Select } from "../components/ui/Select/Select";

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

  const searchHandler = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const editingHandler = (bookmark: Bookmark) => {
    navigate(`/bookmarks/${bookmark.id}/edit`);
  };

  return (
    <>
      <Link to="/bookmarks/new">Create a bookmark</Link>
      <Input
        type="text"
        placeholder="Search bookmark"
        value={search}
        onChange={searchHandler}
      />

      <Select
        id="bookmark-sort"
        label="Sort Bookmarks"
        value={sortOrder}
        options={[
          { label: "Newest First", value: "desc" },
          { label: "Oldest First", value: "asc" },
        ]}
        onChange={(value) => {
          setSortOrder(value as "asc" | "desc");
          setPage(1);
        }}
      ></Select>

      {bookmarks.length === 0 ? (
        <p>No bookmarks found</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <p>{bookmark.title}</p>
            <p>{bookmark.url}</p>
            <Button onClick={() => editingHandler(bookmark)}>Edit</Button>
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
