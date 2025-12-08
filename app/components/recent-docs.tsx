import {
  ChevronRightIcon,
  Clock3Icon,
  ScaleIcon,
  ScrollIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./ui/button";

export default function RecentDocs() {
  const [recentUpdates, setRecentUpdates] = useState<Update[]>([]);

  useEffect(() => setRecentUpdates(mockUpdates), []);

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-secondary-foreground">Latest Updates</h3>
        <Button
          variant="outline"
          size="sm"
          className="text-sm text-primary/90 hover:text-primary font-medium cursor-pointer"
        >
          View All
        </Button>
      </div>
      <div
        className="bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden"
        id="recent-docs-list"
      >
        {recentUpdates.length === 0 ? (
          <div className="flex items-center p-4 border border-b last:border-0 hover:bg-accent transition-colors cursor-pointer">
            <p className="text-muted-foreground text-sm">No Updates</p>
          </div>
        ) : (
          recentUpdates.map((update) => {
            return (
              <div className="flex items-center p-4 border border-b last:border-0 hover:bg-accent transition-colors cursor-pointer">
                <div
                  className={`w-10 h-10 rounded-lg ${Colors[update.category]} flex items-center justify-center shrink-0 mr-4`}
                >
                  {Icons[update.category]}
                </div>
                <div className="flex-1 min-w-0 mr-4">
                  <h4 className="font-medium text-cardtext-card-foreground text-sm truncate mb-1">
                    {update.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Updated {update.date} by {update.author}
                  </p>
                </div>
                <ChevronRightIcon className="size-5" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

type Category = "minutes" | "policy" | "constitution";

type Update = {
  id: number;
  title: string;
  category: Category;
  date: string;
  author: string;
};

const mockUpdates: Update[] = [
  {
    id: 1,
    title: "Minutes - Executive Meeting 4th Dec",
    category: "minutes",
    date: "Dec 4th, 2025",
    author: "Secretary",
  },
  {
    id: 2,
    title: "Treasury Policy Update",
    category: "policy",
    date: "Dec 1st, 2025",
    author: "John Doe",
  },
  {
    id: 3,
    title: "Minutes - Some Other Meeting",
    category: "minutes",
    date: "Dec 2nd, 2025",
    author: "Secretary",
  },
];

type CategoryIconsMap = Record<Category, ReactNode>;

const Icons: CategoryIconsMap = {
  minutes: <Clock3Icon className="stroke-chart-1 rounded-full size-5" />,
  policy: <ScaleIcon className="stroke-chart-2 rounded-full size-5" />,
  constitution: <ScrollIcon className="stroke-chart-4 rounded-full size-5" />,
};

type CategoryColorsMap = Record<Category, string>;

const Colors: CategoryColorsMap = {
  minutes: "bg-chart-1/20",
  policy: "bg-chart-2/20",
  constitution: "bg-chart-4/20",
};
