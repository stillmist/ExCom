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
import { type ComponentProps, type ReactNode } from "react";
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
              onClick={() => toggleSubmenu("files-submenu", "files-icon")}
            >
              <span>Files</span>
              <ChevronDown id="files-icon" className="size-5 rotate-icon" />
            </Button>

            <ul id="files-submenu" className="submenu mt-1 space-y-1 pl-2">
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
  category: Category;
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

const Dashboard = document.getElementById("view-dashboard");
const NavHome = document.getElementById("nav-home");
const NavMinutes = document.getElementById("nav-minutes");
const NavPolicies = document.getElementById("nav-policies");
const NavConstitution = document.getElementById("nav-constitution");

const Explorer = document.getElementById("view-explorer");

/** Toggles the submenus */
function toggleSubmenu(menuId: string, iconId: string) {
  const menu = document.getElementById(menuId);
  const icon = document.getElementById(iconId);
  menu?.classList.toggle("collapsed");
  icon?.classList.toggle("collapsed");
}

type Category = "minutes" | "policies" | "constitution";

function showFiles(category: Category) {
  console.log("In Here switching");
  Dashboard?.classList.add("hidden");
  console.log(Dashboard);
  Explorer?.classList.remove("hidden");

  const folderTitle = document.getElementById("folder-title");
  if (folderTitle)
    folderTitle.innerText =
      category.charAt(0).toUpperCase() + category.slice(1);

  NavHome?.classList.remove("active-nav");

  const navMap: Record<Category, HTMLElement | null> = {
    minutes: NavMinutes,
    policies: NavPolicies,
    constitution: NavConstitution,
  };

  Object.values(navMap).forEach((el) => {
    el?.classList.remove("active-nav");
  });

  if (navMap[category]) {
    navMap[category].classList.add("active-nav");
  }

  document.getElementById("files-submenu")?.classList.remove("collapsed");
  document.getElementById("files-icon")?.classList.remove("collapsed");
}
