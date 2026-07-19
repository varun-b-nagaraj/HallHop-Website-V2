import type { Metadata } from "next";
import { ResourcesPage } from "@/components/pages/resources";

export const metadata: Metadata = { title: "Resources", description: "Practical notes for school teams evaluating digital movement systems, privacy boundaries, and schedule-aware workflows." };
export default function Page() { return <ResourcesPage />; }
