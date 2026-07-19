import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Contact sales",
  description:
    "Tell us how student movement works at your campus and start a HallHop sales conversation shaped around your school day.",
};

export default function Page() {
  return <ContactPage />;
}
