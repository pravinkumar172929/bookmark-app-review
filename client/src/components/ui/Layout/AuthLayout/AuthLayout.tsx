import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export const AuthLayout = () => {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <h1>Bookmark App</h1>
        <Outlet />
      </div>
    </main>
  );
};
