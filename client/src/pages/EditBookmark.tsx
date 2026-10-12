import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

const EditBookmark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id => ", id);

  useEffect(() => {
    const fetchBookmark = async () => {
      const response = await fetch(
        `http://localhost:5001/api/bookmarks/${id}`,
        {
          credentials: "include",
        }
      );

      const data: Bookmark = await response.json();

      if (!response.ok) {
        setError(typeof data === "string" ? data : "Failed to fetch bookmark");
        return;
      }

      setBookmarkValues({
        title: data.title,
        url: data.url,
      });
    };

    fetchBookmark();
  }, [id]);

  const [bookmarkValues, setBookmarkValues] = useState({
    title: "",
    url: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const response = await fetch(
        `http://localhost:5001/api/bookmarks/${id}`,
        {
          method: "PUT",
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

      navigate("/bookmarks");
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    setBookmarkValues({
      title: "",
      url: "",
    });
    navigate("/bookmarks");
  };

  return (
    <>
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
          Add Bookmark
        </button>

        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditBookmark;
