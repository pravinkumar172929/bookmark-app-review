import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const Button = ({ children, disabled = false }: ButtonProps) => {
  return (
    <button className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};
