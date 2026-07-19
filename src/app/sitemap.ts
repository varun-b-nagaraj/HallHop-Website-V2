import type { MetadataRoute } from "next";

const routes = [
  "",
  "/platform",
  "/how-it-works",
  "/security",
  "/api",
  "/resources",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://hallhop.com${route}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));
}
