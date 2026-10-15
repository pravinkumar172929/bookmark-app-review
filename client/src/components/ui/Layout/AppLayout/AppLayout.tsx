import type { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  <div className={styles.layout}>
    <Header />

    <main className={styles.main}>{children}</main>
  </div>;
};
