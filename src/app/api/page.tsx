import type { Metadata } from "next";
import { ApiPage } from "@/components/pages/api";

export const metadata: Metadata = { title: "HAC API documentation", description: "Complete HallHop HAC API documentation: authentication, quickstarts, request fields, responses, errors, limits, security notes, and local setup." };
export default function Page() { return <ApiPage />; }
