import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useTheme } from "../../../../hooks/use-theme";
import { Button } from "../../Button/Button";
import { useAuth } from "../../../../hooks/use-auth";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { setStatus } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setStatus("unauthenticated");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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

      <Button type="button" variant="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </header>
  );
};
