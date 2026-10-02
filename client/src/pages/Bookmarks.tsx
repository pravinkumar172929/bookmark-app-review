import React from "react";

const Bookmarks = () => {
  return (
    <>
      <form>
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="URL" name="url" />
        <button type="submit">Add Bookmark</button>
      </form>
    </>
  );
};

export default Bookmarks;
