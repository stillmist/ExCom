import Dashboard from "~/components/dashboard";
import Sidebar from "~/components/sidebar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ExCom" }, { name: "description", content: "ExCom panel" }];
}

export default function Home() {
  return (
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden relative bg-background">
        <Dashboard />
      </main>
    </div>
  );
}
