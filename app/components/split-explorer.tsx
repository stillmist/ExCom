import clsx from "clsx";
import {
  ArrowDownNarrowWide,
  ArrowDownToLineIcon,
  FilePenIcon,
  FileTextIcon,
  FilterIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import { useState, type ComponentProps, type ReactNode } from "react";
import { useIsMobile } from "~/hooks/useIsMobile";
import type { FileCategoryType } from "~/routes/home";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type SplitExplorerProps = {
  currentFileCategory: FileCategoryType;
};

export default function SplitExplorer({
  currentFileCategory,
}: SplitExplorerProps) {
  /**
   * Permissions that a user has for selective UI rendering
   */
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);

  /**
   * keep track of the current state for selective UI rendering
   */
  const [isEditing, setIsEditing] = useState(false);
  const [isFileOpen, setFileOpen] = useState(true);

  const isMobile = useIsMobile();

  return (
    <div id="view-explorer" className="h-full flex overflow-hidden">
      {/* FILE LIST COLUMN */}
      <aside
        className={clsx(
          `bg-background border-r border-border flex flex-col shrink-0 z-20 shadow-xl md:shadow-none`,
          isMobile ? (!isFileOpen ? "w-full" : "hidden") : "w-80",
        )}
      >
        <div className="h-14 px-4 bg-background border-b border-border flex justify-between items-center sticky top-0">
          <h2 className="font-semibold text-foreground">
            {currentFileCategory[0].toUpperCase() +
              currentFileCategory.slice(1)}
          </h2>
          <div className="flex">
            <Button
              variant="link"
              size="icon"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ArrowDownNarrowWide className="size-5" />
            </Button>
            <Button
              variant="link"
              size="icon"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <FilterIcon className="size-4" />
            </Button>
          </div>
        </div>
        <div id="file-list-container" className="flex-1 overflow-y-auto">
          {/* Populated when page loads */}
        </div>
      </aside>

      {/* DOCUMENT PREVIEW COLUMN */}
      <section
        className={clsx(
          "flex-1 bg-sidebar flex flex-col min-w-0 relative",
          isMobile && isFileOpen ? "w-full" : "",
        )}
      >
        {/* Toolbar */}
        <div className="h-28 md:h-14 bg-card border-b border-border grid grid-cols-1 md:flex items-center justify-between px-2 md:px-6 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden flex-1 mr-0 md:mr-4">
            <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded font-medium uppercase shrink-0">
              {currentFileCategory}
            </span>
            <h2 className="font-bold text-base md:text-lg text-card-foreground truncate">
              {/** Show document title when a document is selected */}
              Select a document
            </h2>
            <span className="text-muted-foreground text-xs ml-2 shrink-0 whitespace-nowrap">
              {/** Date document was updated */} 23rd Dec 2025
            </span>
          </div>

          <div className="mb-1 md:mb-0 flex items-center gap-3 shrink-0">
            <div id="secretary-actions" className="flex gap-2 items-center">
              {/* Import Button */}
              <input
                type="file"
                id="docx-input"
                accept=".docx"
                className="hidden"
              />

              {canEdit && (
                <>
                  <Button
                    size="sm"
                    className="bg-card border border-border text-card-foreground hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors mr-2 cursor-pointer"
                  >
                    <FileTextIcon className="size-4" /> Import .docx
                  </Button>

                  {!isEditing && (
                    <Button
                      id="btn-edit-mode"
                      size="sm"
                      className="bg-card text-muted-foreground hover:text-accent-foreground hover:bg-accent text-sm font-medium transition-colors cursor-pointer"
                    >
                      <FilePenIcon className="size-4" /> Edit
                    </Button>
                  )}
                </>
              )}

              {/* Editor Controls. Only shown when the editing */}
              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-card text-accent-foreground hover:bg-accent text-sm font-medium transition-colors cursor-pointer"
                  >
                    <SaveIcon className="size-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="text-secondary-foreground hover:text-destructive text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {canDelete && !isEditing && (
                <Button
                  size="icon"
                  variant="link"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 dark:hover:bg-destructive/5 text-sm font-medium transition-colors ml-1 cursor-pointer"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              )}
            </div>
            {!isEditing && (
              <>
                <div className="h-4 w-px bg-border mx-0.5 md:mx-1">
                  {/** Divider */}
                </div>

                <ButtonWithTooltip
                  tooltipContent="Download file"
                  buttonContent={<ArrowDownToLineIcon className="size-5" />}
                  variant="link"
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        {/* Scrollable Doc Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center relative">
          <div className="w-full max-w-5xl">
            {/* Paper Container */}
            <div className="bg-card shadow-sm border border-border rounded-lg min-h-[600px] mb-6 relative">
              {/* Read Only View */}
              <div
                id="document-content"
                className="prose max-w-none text-card-foreground/80 p-10"
              >
                {/* Populated when a document is opened */}
              </div>

              {/* Editing View */}
              <div id="editor" className="hidden"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type ButtonWithTooltipProps = {
  tooltipContent: string;
  buttonContent: ReactNode;
} & ComponentProps<typeof Button>;

function ButtonWithTooltip({
  tooltipContent,
  buttonContent,
  ...props
}: ButtonWithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props}>{buttonContent}</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
