import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { Input } from "../components/ui/Input/Input";

const CreateBookmark = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const bookmarkData = {
      title: title,
      url: url,
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
    setTitle("");
    setUrl("");

    navigate("/bookmarks");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          id="title"
          label="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={setTitle}
        />
        <Input
          id="url"
          label="URL"
          type="url"
          placeholder="URL"
          value={url}
          onChange={setUrl}
        />
        {error && <p>{error}</p>}

        <Button type="submit" loading={loading}>
          Add Bookmark
        </Button>

        <Button variant="secondary" type="button" onClick={cancelHandler}>
          Cancel
        </Button>
      </form>
    </>
  );
};

export default CreateBookmark;
