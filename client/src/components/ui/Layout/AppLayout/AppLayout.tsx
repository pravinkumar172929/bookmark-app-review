import { Header } from "../Header/Header";
import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  <div className={styles.layout}>
    <Header />

    <main className={styles.main}>
      <Outlet />
    </main>
  </div>;
};
