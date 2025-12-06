import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ExCom" }, { name: "description", content: "ExCom panel" }];
}

export default function Home() {
  return <div>Home</div>;
}
