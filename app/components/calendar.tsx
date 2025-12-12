import clsx from "clsx";
import { Calendar1Icon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

export default function Calendar() {
  // Populate the calendar days on load
  useEffect(() => renderCalendar(), []);

  return (
    <div className="bg-card rounded-xl shadow-md border-2 border-border p-6 flex flex-col transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between mb-6">
        <h3 className="font-bold text-secondary-foreground text-lg flex items-center gap-2">
          <Calendar1Icon className="size-5 text-chart-1" /> Events Calendar
        </h3>
        <div className="rounded-lg p-1">
          <ButtonGroup>
            <MonthChangeBtn
              onClick={() => changeMonth(-1)}
              icon={<ChevronLeftIcon className="size-5 stroke-2" />}
            />
            <Button
              variant="outline"
              size="sm"
              className="min-w-[100px] text-secondary-foreground/80 hover:text-secondary-foreground text-xs font-bold uppercase tracking-wide"
            >
              <span id="calendar-month">November 2023</span>
            </Button>
            <MonthChangeBtn
              onClick={() => changeMonth(1)}
              icon={<ChevronRightIcon className="size-5 stroke-2" />}
            />
          </ButtonGroup>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-2 text-center border-b border-border pb-2">
        {Days.map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-muted-foreground uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div
        id="calendar-grid"
        className="grid grid-cols-7 gap-4 text-center flex-1"
      >
        {/** Populated by the renderCalendar function */}
      </div>
    </div>
  );
}

const Days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthChangeBtn({
  icon,
  className,
  ...props
}: { icon: ReactNode } & ComponentProps<"button">) {
  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={clsx(
        "flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-card rounded-md transition-colors shadow-sm cursor-pointer",
        className,
      )}
      {...props}
    >
      {icon}
    </Button>
  );
}

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Programatically generates the calendar */
function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month");
  if (!grid || !monthLabel) return;

  grid.innerHTML = "";
  monthLabel.innerText = monthNames[currentMonth] + " " + currentYear;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Empty slots for days before start of month
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "h-8";
    grid.appendChild(empty);
  }

  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && today.getDate() === d;

    const dayEl = document.createElement("div");
    dayEl.className = `h-8 w-8 mx-auto flex flex-col items-center justify-center rounded-full text-xs cursor-pointer transition-colors relative font-bold
              ${isToday ? "bg-secondary text-secondary-foreground font-bold" : "text-muted-foreground/90 hover:bg-accent"}`;

    dayEl.innerHTML = `${d}`.padStart(2, "0");

    grid.appendChild(dayEl);
  }
}

/** Changes the month by the given delta. If you want to go backwards use negative delta */
function changeMonth(delta: number) {
  currentMonth += delta;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}
