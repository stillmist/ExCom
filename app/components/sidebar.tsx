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
import { useState, type ComponentProps, type ReactNode } from "react";
import { useIsMobile } from "~/hooks/useIsMobile";
import { useSidebar } from "~/hooks/useSidebar";
import type { FileCategoryType, ViewType } from "~/routes/home";
import { Button } from "./ui/button";

type SidebarProps = {
  currentView: ViewType;
  currentFileCategory: FileCategoryType;
  onNavChange: (v: ViewType, f: FileCategoryType) => void;
};

export default function Sidebar({
  currentView,
  currentFileCategory,
  onNavChange,
}: SidebarProps) {
  const isMobile = useIsMobile();
  const isOpen = useSidebar((state) => state.isOpen);
  const toggleSidebar = useSidebar((state) => state.toggle);

  // Files submenu
  const [isFilesOpen, setIsFilesOpen] = useState(false);

  return (
    <>
      {isMobile && isOpen && (
        <div
          id="blur-sheet"
          className="absolute inset-0 z-40 bg-background/30 backdrop-blur-sm transition-opacity"
          onClick={() => toggleSidebar()}
        />
      )}
      <nav
        id="main-sidebar"
        className={`absolute inset-y-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 z-50 whitespace-nowrap ${isOpen ? "" : "collapsed"}`}
      >
        <div className="p-4 space-y-1">
          <NavButton
            id="nav-home"
            text="Home"
            icon={<House className="size-4" />}
            className={`${currentView === "dashboard" ? "active-nav" : ""}`}
            onClick={() => onNavChange("dashboard", "")}
          />

          {/** Collapsible folder group */}
          <div className="pt-4">
            <Button
              variant="ghost"
              className="cursor-pointer w-full text-left px-3 py-2 rounded-lg text-xs font-bold bg-sidebar text-muted-foreground hover:text-secondary-foreground uppercase tracking-wider flex items-center justify-between group transition-colors"
              onClick={() => setIsFilesOpen((current) => !current)}
            >
              <span>Files</span>
              <ChevronDown
                id="files-icon"
                className={clsx(
                  "size-5 rotate-icon",
                  isFilesOpen ? "" : "collapsed",
                )}
              />
            </Button>

            <ul
              id="files-submenu"
              className={clsx(
                "submenu mt-1 space-y-1 pl-2",
                isFilesOpen ? "" : "collapsed",
              )}
            >
              {FilesSubmenuItems.map((item) => (
                <li key={item.id}>
                  <SubmenuButton
                    text={item.text}
                    id={item.id}
                    icon={item.icon}
                    className={`${currentView === "explorer" && currentFileCategory === item.category ? "active-nav" : ""}`}
                    onClick={() => onNavChange("explorer", item.category)}
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

type FilesSubmenuItemType = {
  text: string;
  icon: ReactNode;
  category: FileCategoryType;
  id: string;
};

const FilesSubmenuItems: FilesSubmenuItemType[] = [
  {
    text: "Minutes",
    id: "nav-minutes",
    icon: <Clock3Icon className="stroke-chart-1 rounded-full size-5" />,
    category: "minutes",
  },
  {
    text: "Policies",
    id: "nav-policies",
    icon: <ScaleIcon className="stroke-chart-2 rounded-full size-5" />,
    category: "policies",
  },
  {
    text: "Constitution",
    id: "nav-constitution",
    icon: <ScrollIcon className="stroke-chart-4 rounded-full size-5" />,
    category: "constitution",
  },
];

type SubmenuButtonProps = Omit<FilesSubmenuItemType, "category"> &
  ComponentProps<"button">;

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
