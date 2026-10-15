import styles from "./Input.module.css";

type InputProps = {
  id?: string;
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
