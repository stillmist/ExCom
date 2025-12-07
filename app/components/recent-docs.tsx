import { Button } from "./ui/button";

export default function RecentDocs() {
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
        className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
        id="recent-docs-list"
      >
        {/** To be Populated once documents are there */}
      </div>
    </div>
  );
}
