"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, ChevronDown } from "lucide-react";
const acronyms = [
  { text: "FMLA", top: "10%", left: "5%", size: "text-6xl", rot: "-rotate-12", delay: "0s" },
  { text: "CFRA", top: "25%", left: "80%", size: "text-8xl", rot: "rotate-6", delay: "2s" },
  { text: "ADA", top: "70%", left: "15%", size: "text-5xl", rot: "-rotate-6", delay: "1s" },
  { text: "FEHA", top: "60%", left: "75%", size: "text-7xl", rot: "rotate-12", delay: "3s" },
  { text: "SH", top: "40%", left: "50%", size: "text-9xl", rot: "-rotate-3", delay: "0.5s" },
  { text: "SQL", top: "15%", left: "30%", size: "text-6xl", rot: "rotate-12", delay: "1.5s" },
  { text: "SUDO", top: "85%", left: "40%", size: "text-8xl", rot: "-rotate-12", delay: "2.5s" },
  { text: "PAGA", top: "35%", left: "15%", size: "text-5xl", rot: "rotate-6", delay: "0s" },
  { text: "FLSA", top: "80%", left: "85%", size: "text-6xl", rot: "-rotate-6", delay: "1s" },
  { text: "LLM", top: "50%", left: "10%", size: "text-7xl", rot: "rotate-3", delay: "2s" },
  { text: "API", top: "20%", left: "60%", size: "text-5xl", rot: "-rotate-12", delay: "3s" },
  { text: "OSHA", top: "90%", left: "10%", size: "text-6xl", rot: "rotate-6", delay: "1.5s" },
  { text: "DLSE", top: "45%", left: "85%", size: "text-5xl", rot: "-rotate-12", delay: "0.5s" },
  { text: "WARN", top: "5%", left: "50%", size: "text-7xl", rot: "rotate-6", delay: "2s" },
];

export default function CinematicHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center font-sans">
      {/* Fallback Background (Etched Acronyms) */}
      <div className="absolute inset-0 bg-[#0a0a0a] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent_60%)]" />
        
        {/* Dynamic Etched Acronyms */}
        {acronyms.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.size} ${item.rot} font-black text-white/[0.02] select-none mix-blend-overlay font-mono tracking-tighter`}
            style={{ 
              top: item.top, 
              left: item.left, 
              animation: `pulse 8s infinite alternate ${item.delay}`,
              textShadow: '1px 1px 0px rgba(255,255,255,0.02), -1px -1px 0px rgba(0,0,0,0.8)'
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Overlay to darken background for text readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#d4af37]/80 uppercase bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-[#d4af37]/20">
            California Small Business HR
          </span>
        </div>
        
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl mb-8 max-w-4xl">
          Done-for-you HR & AI services.
        </h1>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 drop-shadow-md font-light">
          We help California employers clean up compliance gaps and implement AI tools that give small businesses the output of a large firm.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/book" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#aa8c2c] hover:to-[#8c7324] text-black font-bold tracking-wide py-6 px-8 rounded-none shadow-xl shadow-black/50 transition-all font-sans text-base">
              Book $75 Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/paga-calculator" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold tracking-wide py-6 px-8 rounded-none transition-all font-sans text-base">
              <Calculator className="mr-2 h-4 w-4" /> Free PAGA Risk Check
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-70 hidden md:flex">
        <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase mb-2">Scroll</span>
        <ChevronDown className="h-4 w-4 text-white/70" />
      </div>
    </section>
  );
}
