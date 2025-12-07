import clsx from "clsx";
import {
  ChevronDown,
  Clock3Icon,
  House,
  LogOutIcon,
  ScaleIcon,
  ScrollIcon,
  Settings,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <>
      <nav
        id="main-sidebar"
        className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 z-10 whitespace-nowrap"
      >
        <div className="p-4 space-y-1">
          <NavButton
            id="nav-home"
            text="Home"
            icon={<House className="size-4" />}
            className="active-nav"
          />

          {/** Collapsible folder group */}
          <div className="pt-4">
            <Button
              variant="ghost"
              className="cursor-pointer w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-sidebar text-muted-foreground hover:text-secondary-foreground uppercase tracking-wider flex items-center justify-between group transition-colors"
              onClick={() => toggleSubmenu("files-submenu", "files-icon")}
            >
              <span>Organization Files</span>
              <ChevronDown id="files-icon" className="size-5 rotate-icon" />
            </Button>

            <ul id="files-submenu" className="submenu mt-1 space-y-1 pl-2">
              {FilesSubmenuItems.map((item) => (
                <li>
                  <SubmenuButton
                    text={item.text}
                    id={item.id}
                    icon={item.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/** Bottom actions */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            <Settings className="size-5" /> Settings
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOutIcon className="size-5" /> Logout
          </Button>
        </div>
      </nav>
    </>
  );
}

type NavButtonProps = {
  text: string;
  icon: ReactNode;
} & ComponentProps<"button">;

function NavButton({ text, icon, className, ...props }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={clsx(
        "cursor-pointer w-full justify-start text-left px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:shadow-sm hover:text-sidebar-primary transition-all flex items-center gap-2",
        className,
      )}
      {...props}
    >
      <House className="size-5" /> Home
    </Button>
  );
}

const FilesSubmenuItems = [
  {
    text: "Minutes",
    id: "nav-minutes",
    icon: <Clock3Icon className="stroke-chart-1 rounded-full size-5" />,
  },
  {
    text: "Policies",
    id: "nav-policies",
    icon: <ScaleIcon className="stroke-chart-2 rounded-full size-5" />,
  },
  {
    text: "Constitution",
    id: "nav-constitution",
    icon: <ScrollIcon className="stroke-chart-4 rounded-full size-5" />,
  },
];

type SubmenuButtonProps = {
  text: string;
  icon: ReactNode;
} & ComponentProps<"button">;

function SubmenuButton({
  text,
  icon,
  className,
  ...props
}: SubmenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={clsx(
        "cursor-pointer w-full justify-start text-left px-3 py-2 rounded-md text-sm font-medium text-secondary-foreground hover:text-accent-foreground hover:bg-accent hover:shadow-sm transition-all flex items-center gap-3 border border-transparent",
        className,
      )}
      {...props}
    >
      {icon}
      {text}
    </Button>
  );
}

/** TOggles the submenus */
function toggleSubmenu(menuId: string, iconId: string) {
  const menu = document.getElementById(menuId);
  const icon = document.getElementById(iconId);
  menu?.classList.toggle("collapsed");
  icon?.classList.toggle("collapsed");
}
