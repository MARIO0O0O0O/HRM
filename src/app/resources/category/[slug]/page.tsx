import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: category } = await supabase
    .from("content_categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: articles } = await supabase
    .from("content_articles")
    .select("id, title, slug, cover_url, created_at, tags")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16">
          <Link href="/resources" className="text-indigo-400 text-sm font-semibold hover:underline mb-6 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-zinc-400 max-w-2xl">
              {category.description}
            </p>
          )}
        </header>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/resources/${article.slug}`} className="group flex flex-col h-full bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all">
                <div className="aspect-[16/9] w-full bg-zinc-800 relative overflow-hidden">
                  {article.cover_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.cover_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors mb-4 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="mt-auto text-sm text-zinc-500 font-medium">
                    {new Date(article.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111111] rounded-2xl border border-white/5">
            <h2 className="text-xl text-zinc-400 font-medium">No articles found in this category.</h2>
          </div>
        )}
      </div>
    </main>
  );
}
