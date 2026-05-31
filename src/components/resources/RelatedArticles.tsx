import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface RelatedArticlesProps {
  currentArticleId: string;
  tags: string[];
}

export default async function RelatedArticles({ currentArticleId, tags }: RelatedArticlesProps) {
  const supabase = createClient();

  // Stub: tag-based related articles (pgvector semantic search will replace this in Week 4)
  // For now, we just fetch articles that share at least one tag, excluding the current article.
  const { data: articles } = await supabase
    .from("content_articles")
    .select("id, title, slug, cover_url")
    .eq("status", "published")
    .neq("id", currentArticleId)
    .overlaps("tags", tags)
    .limit(3);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-white/10 mt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-zinc-100">Related Reading</h3>
        <Link href="/resources" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center transition-colors">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/resources/${article.slug}`} className="group block">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-800 mb-4 border border-white/5 relative">
              {article.cover_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.cover_url}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20" />
              )}
            </div>
            <h4 className="text-lg font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors line-clamp-2">
              {article.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
