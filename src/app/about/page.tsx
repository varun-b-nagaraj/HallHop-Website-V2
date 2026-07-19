import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "HallHop was built by students who lived the paper-pass problem — then decided to fix it. The story, the team, and what we're building now.",
};

export default function Page() {
  return <AboutPage />;
}
