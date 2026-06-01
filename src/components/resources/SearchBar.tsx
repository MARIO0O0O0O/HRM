"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  similarity: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setIsOpen(true);
      const { data, error } = await supabase.rpc("search_articles", {
        search_query: debouncedQuery,
      });

      if (!error && data) {
        setResults(data as SearchResult[]);
      } else {
        setResults([]);
      }
      setLoading(false);
      setSelectedIndex(-1);
    };

    fetchResults();
  }, [debouncedQuery, supabase]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        navigateToResult(results[selectedIndex].slug);
      } else if (results.length > 0) {
        navigateToResult(results[0].slug);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const navigateToResult = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/resources/${slug}`);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={wrapperRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-zinc-500 h-5 w-5" />
        <input
          type="text"
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-10 text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors"
          placeholder="Search HR guides, templates, and compliance info..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
        />
        {loading && (
          <Loader2 className="absolute right-3 text-zinc-500 h-5 w-5 animate-spin" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#111111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="max-h-[300px] overflow-y-auto py-2">
              {results.map((result, idx) => (
                <li
                  key={result.id}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    idx === selectedIndex ? "bg-indigo-500/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                  onClick={() => navigateToResult(result.slug)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <p className="text-sm font-semibold text-zinc-100 truncate">{result.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            !loading && (
              <div className="px-4 py-6 text-center text-zinc-500 text-sm">
                No articles found for &quot;{query}&quot;
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
