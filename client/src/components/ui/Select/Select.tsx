import styles from "./Select.module.css";

type SelectProps = {
  id?: string;
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const Select = ({
  id,
  label,
  value,
  options,
  onChange,
}: SelectProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
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
    </div>
  );
};
