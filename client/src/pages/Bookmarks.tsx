import React, { useState } from "react";

const Bookmarks = () => {
  const [bookmarkValues, setBookmarkValues] = useState({
    title: "",
    url: "",
  });

  const bookmarkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);

    setBookmarkValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form>
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

        <button type="submit">Add Bookmark</button>
      </form>
    </>
  );
};

export default Bookmarks;
