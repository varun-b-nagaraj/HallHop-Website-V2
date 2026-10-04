import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the student founders building HallHop for schools.",
  alternates: {
    canonical: "/team",
  },
};

export default function Page() {
  return <AboutPage scrollToTeam />;
}
