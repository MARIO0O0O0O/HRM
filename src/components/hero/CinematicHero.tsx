'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, ChevronDown, Scale, FileSignature, Network } from "lucide-react";

export default function CinematicHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random electric pulses
  const pulses = Array.from({ length: 15 }).map((_, i) => {
    const isHorizontal = i % 2 === 0;
    const top = isHorizontal ? `${Math.floor(Math.random() * 100)}%` : '0';
    const left = isHorizontal ? '0' : `${Math.floor(Math.random() * 100)}%`;
    const delay = `${(Math.random() * 5).toFixed(2)}s`;
    const duration = `${(Math.random() * 2 + 2).toFixed(2)}s`;
    const color = i % 3 === 0 ? 'bg-amber-400' : 'bg-cyan-400';
    
    return { isHorizontal, top, left, delay, duration, color };
  });

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center font-sans bg-[#020617]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes shoot-x {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes shoot-y {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan { animation: scanline 8s linear infinite; }
        .electric-pulse-x { animation: shoot-x linear infinite; }
        .electric-pulse-y { animation: shoot-y linear infinite; }
      `}} />

      {/* 1. Intricate Tech / Legal Blueprint Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px),
            linear-gradient(rgba(251,191,36,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: 'center center'
        }}
      />

      {/* 2. Traditional HR Watermarks (The juxtaposition) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <span className="font-playfair font-black text-[40vw] leading-none text-white tracking-tighter select-none">
          §
        </span>
      </div>
      
      {/* 3. High-Tech Electric Pulses across the grid */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
          {pulses.map((pulse, i) => (
            <div
              key={i}
              className={`absolute ${pulse.color} shadow-[0_0_15px_rgba(34,211,238,0.8)]`}
              style={{
                top: pulse.top,
                left: pulse.left,
                width: pulse.isHorizontal ? '100px' : '1px',
                height: pulse.isHorizontal ? '1px' : '100px',
                animationName: pulse.isHorizontal ? 'shoot-x' : 'shoot-y',
                animationDuration: pulse.duration,
                animationDelay: pulse.delay,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Scanning AI Laser (Document Scan Effect) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,1)] z-0 pointer-events-none animate-scan mix-blend-screen" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cyan-400/5 z-0 pointer-events-none animate-scan mix-blend-screen -mt-32" />

      {/* 5. Center Glow to anchor the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/30 blur-[150px] pointer-events-none z-0 rounded-[100%]" />

      {/* Dark Vignette to keep focus center */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)] pointer-events-none" />

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-12">
        <div className="mb-8 flex items-center justify-center gap-4 text-cyan-500/80">
          <Scale className="h-6 w-6" />
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <Network className="h-6 w-6" />
        </div>
        
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight drop-shadow-2xl mb-8 max-w-5xl">
          Traditional HR Meets{' '}
          <span className="relative whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-400 relative z-10">
              High-Tech Electric.
            </span>
            <span className="absolute inset-0 bg-cyan-400/20 blur-2xl z-0" />
          </span>
        </h1>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 drop-shadow-md font-light leading-relaxed">
          We bring intricate legal compliance frameworks into the AI era. Modern tools, classic protection.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/book" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto h-14 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold tracking-wide px-8 rounded-none border border-cyan-400/50 shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] transition-all duration-300 hover:scale-105 font-sans text-base flex items-center gap-2">
              <FileSignature className="h-4 w-4" /> Book $75 Consultation <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/paga-calculator" className="w-full sm:w-auto group">
            <Button variant="outline" className="w-full sm:w-auto h-14 border-white/20 hover:border-cyan-400/60 bg-[#020617]/50 hover:bg-cyan-950/50 backdrop-blur-md text-cyan-50 font-semibold tracking-wide px-8 rounded-none transition-all duration-300 font-sans text-base">
              <Calculator className="mr-2 h-4 w-4 text-cyan-400 group-hover:rotate-12 transition-transform" /> Free PAGA Risk Check
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-70 hidden md:flex">
        <span className="font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase mb-2">Scroll</span>
        <ChevronDown className="h-4 w-4 text-cyan-400/80" />
      </div>
    </section>
  );
}
