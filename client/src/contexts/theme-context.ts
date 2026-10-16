import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  todggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
