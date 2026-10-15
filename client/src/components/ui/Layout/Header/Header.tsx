import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/">Bookmark App</Link>

      <nav>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/bookmark/new">Add Bookmark</Link>
      </nav>
    </header>
  );
};
