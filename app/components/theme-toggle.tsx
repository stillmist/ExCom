import { MoonIcon, SunDimIcon } from "lucide-react";
import { useTheme } from "~/context/theme";

import { Button } from "./ui/button";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <>
      <Button
        variant="link"
        size={"icon"}
        className="text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus:outline-none"
        onClick={() => toggleTheme()}
      >
        <SunDimIcon className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
