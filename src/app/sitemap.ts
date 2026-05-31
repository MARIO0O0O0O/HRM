import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bizhr.vercel.app";
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("content_articles")
    .select("slug, updated_at")
    .eq("status", "published");

  const { data: categories } = await supabase
    .from("content_categories")
    .select("slug");

  const staticRoutes = [
    "",
    "/book",
    "/resources",
    "/resources/compare",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const articleRoutes = (articles || []).map((article) => ({
    url: `${baseUrl}/resources/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryRoutes = (categories || []).map((category) => ({
    url: `${baseUrl}/resources/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
