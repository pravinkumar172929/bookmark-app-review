import type { ReactNode } from "react";
import styles from "./Button.module.css";
import { Spinner } from "../Spinner/Spinner";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  loading = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
