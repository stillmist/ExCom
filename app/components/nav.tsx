import { Menu, SearchIcon, SunDimIcon } from "lucide-react";

import appIcon from "public/pwa-512x512.png";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export default function Nav() {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shrink-0 z-20 relative shadow-sm">
      <div className="flex items-center gap-4">
        {/** Sidebar toggle button */}
        <Button
          variant="link"
          size={"icon"}
          className="text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus:outline-none"
        >
          <Menu className="size-5" />
        </Button>

        <div className="flex items-center cursor-pointer">
          <a href="/" className="flex items-center">
            <div className="size-17 flex items-center justify-center">
              <img src={appIcon} />
            </div>
            <h1 className="font-semibold text-xl text-secondary-foreground tracking-tight">
              ExCom
            </h1>
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/** dark / light mode toggler */}
        <ThemeToggler />

        {/** Search input */}
        <div className="relative hidden md:block">
          <InputGroup className="bg-secondary border-none rounded-full text-sm w-64 hover:ring hover:ring-secondary-foreground focus:ring-2 focus:ring-primary outline-none transition-all">
            <InputGroupInput type="text" placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden border-2 border-secondary shadow-md cursor-pointer hover:ring-2 ring-offset-1 ring-primary transition-all">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User"
          />
        </div>
      </div>
    </header>
  );
}

export function ThemeToggler() {
  return (
    <Button
      variant="link"
      size={"icon"}
      className="text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus:outline-none"
    >
      <SunDimIcon className="size-6" />
    </Button>
  );
}
