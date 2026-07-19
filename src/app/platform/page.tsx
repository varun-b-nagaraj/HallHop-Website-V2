import type { Metadata } from "next";
import { PlatformPage } from "@/components/pages/platform";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Digital pass flow, schedule context, teacher controls, live hallway visibility, pattern review, and student insight in one connected platform.",
};

export default function Page() {
  return <PlatformPage />;
}
