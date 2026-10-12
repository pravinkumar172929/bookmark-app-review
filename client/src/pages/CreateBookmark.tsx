import React, { useState } from "react";

const CreateBookmark = () => {
  const [bookmarkValues, setBookmarkValues] = useState({
    title: "",
    url: "",
  });

  const bookmarkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      const response = await fetch("http://localhost:5001/api/bookmarks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkData),
      });

      const data = response.json();
    } catch (error) {
      // setError("Something went wrong!");
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
        {/* {error && <p>{error}</p>} */}

        <button type="submit">Add Bookmark</button>

        <button type="button">Cancel</button>

        {/* {editingBookmarkId && <button onClick={cancelHandler}>Cancel</button>} */}
      </form>
    </>
  );
};

export default CreateBookmark;
