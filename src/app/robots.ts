import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/resources/"],
      disallow: ["/admin/", "/api/", "/tools/*/preview"],
    },
    sitemap: "https://bizhr.vercel.app/sitemap.xml",
  };
}
