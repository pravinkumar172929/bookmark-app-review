import { useState } from "react";
import { ThemeContext } from "../contexts/theme-context";

export const ThemeProvider = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    ></ThemeContext.Provider>
  );
};
