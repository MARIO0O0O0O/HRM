import React from "react";
import Link from "next/link";
import SearchBar from "@/components/resources/SearchBar";
import { createClient } from "@/lib/supabase/client";

export const revalidate = 3600;

export default async function ResourcesIndexPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from("content_articles")
    .select("id, title, slug, cover_url, created_at, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const { data: categories } = await supabase
    .from("content_categories")
    .select("id, name, slug");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            HR Compliance <span className="text-indigo-400 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Resources</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Actionable guides, templates, and insights for California small businesses.
          </p>
          <div className="pt-6">
            <SearchBar />
          </div>
        </header>

        {/* Categories / Filter stub */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link href="/resources" className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 font-medium text-sm border border-indigo-500/30">
            All Articles
          </Link>
          {categories?.map((cat) => (
            <Link key={cat.id} href={`/resources/category/${cat.slug}`} className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium text-sm border border-white/5 transition-colors">
              {cat.name}
            </Link>
          ))}
          <Link href="/resources/compare" className="px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-medium text-sm border border-cyan-500/20 transition-colors">
            Comparisons
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article) => (
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
      </div>
    </main>
  );
}
