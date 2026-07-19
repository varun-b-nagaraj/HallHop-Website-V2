import type { Metadata } from "next";
import { SecurityPage } from "@/components/pages/security";

export const metadata: Metadata = { title: "Trust & privacy", description: "HallHop's approach to role-shaped access, minimal data exposure, human-reviewed patterns, and FERPA-aware product design." };
export default function Page() { return <SecurityPage />; }
