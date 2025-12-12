import { useState } from "react";
import Dashboard from "~/components/dashboard";
import Sidebar from "~/components/sidebar";
import SplitExplorer from "~/components/split-explorer";
import { useSidebar } from "~/hooks/useSidebar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ExCom" }, { name: "description", content: "ExCom panel" }];
}

/** Different page layouts of the app */
const Views = ["dashboard", "explorer"] as const;
export type ViewType = (typeof Views)[number];

/** Categories of files that are displayed in the explorer view */
const FileCategories = ["", "minutes", "policies", "constitution"] as const;
export type FileCategoryType = (typeof FileCategories)[number];

export default function Home() {
  const sidebarIsOpen = useSidebar((state) => state.isOpen);

  /**
   * These states help keep track of the current view and current file category
   * for UI rendering
   */
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [activeFileCategory, setActiveFileCategory] =
    useState<FileCategoryType>("minutes");

  function onNavChange(
    newActiveView: ViewType,
    newActiveFileCategory: FileCategoryType,
  ) {
    setActiveView(newActiveView);
    setActiveFileCategory(newActiveFileCategory);
  }

  return (
    <div className="flex-1 flex overflow-hidden relative">
      <Sidebar
        currentView={activeView}
        currentFileCategory={activeFileCategory}
        onNavChange={onNavChange}
      />
      <main
        className={`flex-1 overflow-hidden relative bg-background transition-all duration-300 ease-in-out ml-0 ${sidebarIsOpen ? "lg:ml-64" : "lg:ml-0"}`}
      >
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "explorer" && (
          <SplitExplorer currentFileCategory={activeFileCategory} />
        )}
      </main>
    </div>
  );
}
