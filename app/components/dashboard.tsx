import { ArrowRightIcon } from "lucide-react";
import Calendar from "./calendar";
import DashActions from "./dash-actions";
import RecentDocs from "./recent-docs";

export default function Dashboard() {
  return (
    <div id="view-dashboard" className="h-full overflow-y-auto p-8 fade-in">
      <div className="max-w-6xl mx-auto">
        {/** Welcome header */}
        <div className="mb-8">
          <h2
            id="welcome-msg"
            className="text-3xl font-bold text-foreground mb-2"
          >
            Welcome back, Kim
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening in the organization today.
          </p>
        </div>

        {/** Top Section: Actions & Calendar */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/** LEFT: Quick Actions Grid */}
          <DashActions />

          {/** RIGHT: Wide Calendar Widget */}
          <Calendar />
        </div>

        {/** Bottom Section: Latest Docs & Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/** Recent Documents */}
          <RecentDocs />

          {/** Sidebar Section (Featured Policy) */}
          <div className="lg:col-span-1">
            <div>
              <h3 className="font-bold text-secondary-foreground mb-4">
                Featured Policy
              </h3>
              <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-slate-300 relative overflow-hidden group cursor-pointer">
                <div className="relative z-10">
                  <span className="text-sm font-medium text-chart-2 group-hover:text-chart-2 flex items-center gap-2 mb-4">
                    Read Policy <ArrowRightIcon className="size-4" />
                  </span>
                  <span className="bg-chart-2/10 text-chart-2 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                    Updated
                  </span>
                  <h4 className="text-xl font-bold mb-2">
                    Remote Work Guidelines
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Review the updated hybrid work requirements and equipment
                    stipends for Q4.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
