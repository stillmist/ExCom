import clsx from "clsx";
import {
  CalendarPlus2Icon,
  PlusIcon,
  ScaleIcon,
  ScrollIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "./ui/button";

export default function DashActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Actions.map((action) => (
        <ActionCard
          id={action.id}
          title={action.title}
          description={action.description}
          icon={action.icon}
          color={action.color}
        />
      ))}
    </div>
  );
}

type Action = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: "1" | "2" | "3" | "4"; // Match the chart-1 to chart-4 in the styling
};

const Actions: Action[] = [
  {
    id: "dash-btn-minutes",
    title: "Upload Minutes",
    description: "Post new meeting records to the folder.",
    icon: <PlusIcon className="size-6" />,
    color: "1",
  },
  {
    id: "dash-btn-agenda",
    title: "Submit Agenda Item",
    description: "Propose topics for the next executive meeting.",
    icon: <CalendarPlus2Icon className="size-6" />,
    color: "3",
  },
  {
    id: "dash-btn-policies",
    title: "Review Policies",
    description: "Access the latest guidelines.",
    icon: <ScaleIcon className="size-6" />,
    color: "2",
  },
  {
    id: "dash-btn-minutes",
    title: "Open Constitution",
    description: "Read the founding document.",
    icon: <ScrollIcon className="size-6" />,
    color: "4",
  },
];

type ActionCardProps = Action & ComponentProps<"button">;

function ActionCard({
  title,
  description,
  icon,
  color,
  className,
  ...props
}: ActionCardProps) {
  return (
    <Button
      data-color={color}
      variant="ghost"
      className={clsx(
        "flex flex-col items-start p-5 bg-card border-2 rounded-xl shadow-sm hover:shadow-md transition-all group text-left h-full cursor-pointer",
        "data-[color=1]:border-chart-1/20 data-[color=1]:hover:border-chart-1/50",
        "data-[color=2]:border-chart-2/20 data-[color=2]:hover:border-chart-2/50",
        "data-[color=3]:border-chart-3/20 data-[color=3]:hover:border-chart-3/50",
        "data-[color=4]:border-chart-4/20 data-[color=4]:hover:border-chart-4/50",
        className,
      )}
      {...props}
    >
      <div
        data-color={color}
        className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors",
          "data-[color=1]:bg-chart-1/20 data-[color=1]:text-chart-1 data-[color=1]:group-hover:bg-chart-1 data-[color=1]:group-hover:text-card",
          "data-[color=2]:bg-chart-2/20 data-[color=2]:text-chart-2 data-[color=2]:group-hover:bg-chart-2 data-[color=2]:group-hover:text-card",
          "data-[color=3]:bg-chart-3/20 data-[color=3]:text-chart-3 data-[color=3]:group-hover:bg-chart-3 data-[color=3]:group-hover:text-card",
          "data-[color=4]:bg-chart-4/20 data-[color=4]:text-chart-4 data-[color=4]:group-hover:bg-chart-4 data-[color=4]:group-hover:text-card",
        )}
      >
        {icon}
      </div>
      <h3 className="font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground whitespace-normal">
        {description}
      </p>
    </Button>
  );
}
