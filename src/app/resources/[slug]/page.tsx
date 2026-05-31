import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import HighTicketUpsell from "@/components/tools/HighTicketUpsell";
import RelatedArticles from "@/components/resources/RelatedArticles";
import ScrollCTA from "@/components/resources/ScrollCTA";

export const revalidate = 3600;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const supabase = createClient();
  const { data: article } = await supabase
    .from("content_articles")
    .select("title, slug, created_at")
    .eq("slug", slug)
    .single();

  if (!article) return {};

  return {
    title: `${article.title} | BizHR Resources`,
    description: `Read ${article.title} on BizHR. Expert HR guides for California small businesses.`,
    alternates: {
      canonical: `https://bizhr.vercel.app/resources/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: article } = await supabase
    .from("content_articles")
    .select("id, title, body_mdx, cover_url, created_at, tags, author_id")
    .eq("slug", slug)
    .single();

  if (!article) {
    notFound();
  }

  // Calculate reading time
  const wordCount = article.body_mdx?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Generate TOC from markdown headings (H2 and H3)
  const headings = article.body_mdx?.match(/^#{2,3}\s+(.*)/gm) || [];
  const toc = headings.map((h: string) => {
    const level = h.startsWith("###") ? 3 : 2;
    const text = h.replace(/^#{2,3}\s+/, "");
    return { level, text, id: text.toLowerCase().replace(/[^\w]+/g, "-") };
  });

  // Basic markdown to HTML (for demonstration, ideally use next-mdx-remote or remark)
  let htmlBody = article.body_mdx || "";
  // Simple heading IDs for TOC
  htmlBody = htmlBody.replace(/^(#{2,3})\s+(.*)/gm, (match: string, hashes: string, text: string) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, "-");
    const tag = hashes.length === 2 ? "h2" : "h3";
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.created_at,
    dateModified: article.created_at,
    author: {
      "@type": "Person",
      name: "BizHR Expert",
    },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-24 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollCTA />
      
      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center space-x-4 text-sm text-zinc-400 mb-6 font-medium">
            <span>{new Date(article.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
            {article.title}
          </h1>
          {article.cover_url && (
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.cover_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* TOC Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Table of Contents</h3>
              <nav className="flex flex-col space-y-3">
                {toc.map((item: any, i: number) => (
                  <a 
                    key={i} 
                    href={`#${item.id}`} 
                    className={`text-sm hover:text-indigo-400 transition-colors ${item.level === 3 ? "ml-4 text-zinc-500" : "text-zinc-300 font-medium"}`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article Content */}
          <div className="flex-1 min-w-0 prose prose-invert prose-indigo prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-400">
            {/* If we had a real MDX renderer, we'd use it here. For now dangerouslySetInnerHTML with the raw body or simple parsed HTML */}
            <div dangerouslySetInnerHTML={{ __html: htmlBody.replace(/\n\n/g, "<br/><br/>") }} />
            
            <div className="mt-16">
              <HighTicketUpsell />
            </div>

            <RelatedArticles currentArticleId={article.id} tags={article.tags || []} />
          </div>
        </div>
      </article>
    </main>
  );
}
