import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://hallhop.com/sitemap.xml",
    host: "https://hallhop.com",
  };
}
