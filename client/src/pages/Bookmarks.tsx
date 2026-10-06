import React, { useState } from "react";

const Bookmarks = () => {
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
    console.log("bookmarkValues => ", bookmarkValues);

    const bookmarkData = {
      title: bookmarkValues.title,
      url: bookmarkValues.url,
    };

    try {
      setError("");
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/bookmarks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkData),
      });

      const data = await response.json();

      console.log("bookmark response => ", data);

      if (!response.ok) {
        setError(data);
      }
    } catch (error) {
      console.log("bookmark error:", error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
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
          {loading ? "Adding Bookmark" : "Add Bookmark"}
        </button>
      </form>
    </>
  );
};

export default Bookmarks;
