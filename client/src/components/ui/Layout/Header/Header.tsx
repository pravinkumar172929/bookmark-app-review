import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Bookmark App</Link>

      <nav className={styles.nav}>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/bookmarks/new">Add Bookmark</Link>
      </nav>
    </header>
  );
};
