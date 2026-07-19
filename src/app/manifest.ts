import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HallHop — The hallway, understood",
    short_name: "HallHop",
    description:
      "Digital passes, live hallway context, and useful patterns for schools.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3efe6",
    theme_color: "#f3efe6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
