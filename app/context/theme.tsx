import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
} from "react";

type Theme = string;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: ComponentProps<"div">) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Ensure is running in client
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (
        !savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
      return savedTheme || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old class and add new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Persist to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
