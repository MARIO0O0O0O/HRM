'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, ChevronDown, Scale, Network, FolderOpen, Briefcase, FileText, BadgeCheck } from "lucide-react";

export default function CinematicHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate slow nodes traversing the circuits
  const nodes = Array.from({ length: 12 }).map((_, i) => {
    const isHorizontal = i % 2 === 0;
    const top = isHorizontal ? `${10 + Math.floor(Math.random() * 80)}%` : '0';
    const left = isHorizontal ? '0' : `${10 + Math.floor(Math.random() * 80)}%`;
    const delay = `${(Math.random() * 10).toFixed(2)}s`;
    const duration = `${(Math.random() * 15 + 15).toFixed(2)}s`; // 15 to 30 seconds
    const color = i % 3 === 0 ? 'bg-amber-400' : 'bg-cyan-400';
    
    return { isHorizontal, top, left, delay, duration, color };
  });

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center font-sans bg-[#020617]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes traverse-x {
          0% { transform: translateX(-10vw); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        @keyframes traverse-y {
          0% { transform: translateY(-10vh); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes float-icon {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
          50% { transform: translateY(-30px) rotate(3deg); opacity: 0.15; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
        }
        .node-x { animation: traverse-x linear infinite; }
        .node-y { animation: traverse-y linear infinite; }
        .float-hr-object { animation: float-icon 15s ease-in-out infinite; }
      `}} />

      {/* 1. Subtle Perspective Tron Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center perspective-[1000px] opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
        <div 
          className="w-[200vw] h-[200vh] absolute bottom-[-50vh] origin-center"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transform: 'rotateX(75deg) translateY(-20%)',
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)'
          }}
        />
      </div>

      {/* 2. Slow Nodes (Data packets) on the grid */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
          {nodes.map((node, i) => (
            <div
              key={i}
              className={`absolute ${node.color} rounded-full shadow-[0_0_20px_4px_rgba(34,211,238,0.6)]`}
              style={{
                top: node.top,
                left: node.left,
                width: '6px',
                height: '6px',
                animationName: node.isHorizontal ? 'traverse-x' : 'traverse-y',
                animationDuration: node.duration,
                animationDelay: node.delay,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      )}

      {/* 3. Traditional HR Objects intertwined with the circuitry */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <Scale className="absolute top-[20%] left-[15%] w-32 h-32 text-cyan-500 float-hr-object" style={{animationDelay: '0s'}} />
        <FolderOpen className="absolute top-[70%] left-[10%] w-24 h-24 text-amber-500 float-hr-object" style={{animationDelay: '3s'}} />
        <Briefcase className="absolute top-[15%] right-[20%] w-28 h-28 text-cyan-500 float-hr-object" style={{animationDelay: '6s'}} />
        <FileText className="absolute top-[65%] right-[15%] w-36 h-36 text-cyan-300 float-hr-object" style={{animationDelay: '9s'}} />
        <BadgeCheck className="absolute top-[45%] left-[5%] w-20 h-20 text-amber-400 float-hr-object" style={{animationDelay: '2s'}} />
      </div>

      {/* Center Glow to anchor text and soften background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#020617]/90 blur-[80px] pointer-events-none z-0 rounded-[100%]" />

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
              Book $75 Consultation <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
