import type { Metadata } from "next";
import { ApiPage } from "@/components/pages/api";

export const metadata: Metadata = { title: "HAC API", description: "A separate HallHop service that translates Home Access Center information into structured data for authorized school tools." };
export default function Page() { return <ApiPage />; }
