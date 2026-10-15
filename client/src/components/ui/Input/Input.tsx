import styles from "./Input.module.css";

type InputProps = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
