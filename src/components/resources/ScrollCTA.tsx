"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function ScrollCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (hasDismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / docHeight;

      // Show between 33% and 66% scroll depth
      if (scrollPercent > 0.33 && scrollPercent < 0.66) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissed]);

  if (!isVisible || hasDismissed) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 max-w-sm w-[90%] md:w-auto">
      <div className="bg-indigo-600 text-white rounded-2xl shadow-2xl p-1 pr-2 flex items-center border border-indigo-400/30">
        <Link href="/book" className="flex items-center px-4 py-3 hover:opacity-90 transition-opacity">
          <span className="font-medium text-sm md:text-base mr-2">Need help implementing this? Book a free 30-min session</span>
          <ArrowRight className="h-5 w-5 flex-shrink-0" />
        </Link>
        <button 
          onClick={() => setHasDismissed(true)}
          className="p-2 hover:bg-black/20 rounded-xl transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
