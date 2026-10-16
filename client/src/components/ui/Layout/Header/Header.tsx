import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useTheme } from "../../../../hooks/use-theme";
import { Button } from "../../Button/Button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Link to="/">Bookmark App</Link>

      <nav className={styles.nav}>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/bookmarks/new">Add Bookmark</Link>

        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      <Button type="button">Logout</Button>
    </header>
  );
};
