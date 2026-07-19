import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/how-it-works";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Four quiet moments turn a hall pass into useful context: request, decide, move, and learn.",
};

export default function Page() {
  return <HowItWorksPage />;
}
