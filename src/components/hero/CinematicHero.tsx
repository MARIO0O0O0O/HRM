'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, ChevronDown } from "lucide-react";

export default function CinematicHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center font-sans bg-[#030303]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, -5%) scale(1.05); }
          66% { transform: translate(-5%, 5%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-5%, 5%) scale(0.95); }
          66% { transform: translate(5%, -5%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-drift { animation: drift 20s ease-in-out infinite alternate; }
        .animate-drift-reverse { animation: drift-reverse 25s ease-in-out infinite alternate; }
      `}} />

      {/* 1. Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)'
        }}
      />

      {/* 2. Massive Editorial Typography (HR/AI Jargon) */}
      <div className="absolute inset-0 flex flex-col justify-between overflow-hidden pointer-events-none z-0 opacity-[0.02] mix-blend-screen">
        <div className="text-[12vw] font-black leading-none whitespace-nowrap -ml-[5vw] mt-[2vh] font-sans tracking-tighter text-white">
          COMPLIANCE AI PAGA
        </div>
        <div className="text-[14vw] font-black leading-none whitespace-nowrap ml-[10vw] font-playfair italic tracking-tight text-white">
          SUDO CFRA FEHA
        </div>
        <div className="text-[12vw] font-black leading-none whitespace-nowrap -ml-[10vw] mb-[2vh] font-mono tracking-tighter text-white">
          FMLA SQL LLM ADA
        </div>
      </div>

      {/* 3. Glowing Auroras / Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Amber Aurora */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-[100%] bg-amber-600/20 blur-[140px] animate-drift mix-blend-screen" />
        
        {/* Indigo Aurora */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-[100%] bg-indigo-700/20 blur-[150px] animate-drift-reverse mix-blend-screen" />
        
        {/* Interactive Cyan Spotlight (follows mouse) */}
        {isMounted && (
          <div 
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[120px] transition-transform duration-1000 ease-out mix-blend-screen pointer-events-none"
            style={{
              transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
            }}
          />
        )}
      </div>

      {/* 4. Film Grain Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 5. Dark Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] pointer-events-none" />

      {/* Main Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-8">
        <div className="mb-8">
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-50" />
            <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#030303] px-6 py-2 text-xs font-mono tracking-[0.2em] text-indigo-200 uppercase backdrop-blur-3xl border border-white/5">
              California Small Business HR
            </div>
          </div>
        </div>
        
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight drop-shadow-2xl mb-8 max-w-5xl">
          Done-for-you HR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            & AI services.
          </span>
        </h1>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 drop-shadow-md font-light leading-relaxed">
          We help California employers clean up compliance gaps and implement AI tools that give small businesses the output of a large firm.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/book" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold tracking-wide px-8 rounded-full shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-105 font-sans text-base">
              Book $75 Consultation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/paga-calculator" className="w-full sm:w-auto group">
            <Button variant="outline" className="w-full sm:w-auto h-14 border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold tracking-wide px-8 rounded-full transition-all duration-300 font-sans text-base">
              <Calculator className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" /> Free PAGA Risk Check
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-50 hidden md:flex">
        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase mb-2">Scroll</span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </div>
    </section>
  );
}
