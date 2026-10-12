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
