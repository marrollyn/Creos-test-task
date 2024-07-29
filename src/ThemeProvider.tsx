import * as React from "react";
import {useState, ReactNode} from 'react';

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

// export const ThemeContext = React.createContext<ThemeContext>(
//   {} as ThemeContext
// );

export const ThemeContext = React.createContext<ThemeContext | undefined>(
  undefined // лучше использовать undefined, чем {} as ThemeContext
);

interface ThemeProviderProps {
  children: ReactNode; // Определяем тип для children
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
