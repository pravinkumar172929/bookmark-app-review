import styles from "./Select.module.css";

type SelectProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const Select = ({ value, options, onChange }: SelectProps) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
