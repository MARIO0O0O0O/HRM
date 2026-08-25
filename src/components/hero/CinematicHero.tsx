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

      {/* 1.5. LA Skyline Silhouette -- the cinematic backdrop */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[45%] z-0 pointer-events-none"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skylineFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" stopOpacity="0" />
            <stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Back layer -- distant, dimmer skyline */}
        <g fill="#0f1a3d" opacity="0.7">
          <rect x="40" y="220" width="50" height="180" />
          <rect x="100" y="180" width="40" height="220" />
          <rect x="150" y="240" width="55" height="160" />
          <rect x="900" y="200" width="45" height="200" />
          <rect x="955" y="230" width="35" height="170" />
          <rect x="1400" y="210" width="50" height="190" />
          <rect x="1460" y="250" width="40" height="150" />
        </g>
        {/* Front layer -- closer, brighter skyline with a City-Hall-esque tower */}
        <g fill="#162454">
          <rect x="200" y="260" width="60" height="140" />
          <rect x="270" y="200" width="45" height="200" />
          <rect x="325" y="290" width="70" height="110" />
          {/* Tower with stepped crown, echoing LA City Hall */}
          <rect x="410" y="120" width="55" height="280" />
          <rect x="420" y="90" width="35" height="35" />
          <rect x="428" y="65" width="19" height="30" />
          <rect x="480" y="250" width="50" height="150" />
          <rect x="540" y="210" width="42" height="190" />
          <rect x="590" y="270" width="65" height="130" />
          <rect x="670" y="230" width="48" height="170" />
          <rect x="730" y="180" width="38" height="220" />
          <rect x="780" y="255" width="58" height="145" />
          {/* Palm trees, scattered */}
          <g stroke="#162454" strokeWidth="4" fill="none">
            <path d="M 150 400 L 150 340" />
            <path d="M 150 340 Q 130 320 110 325" />
            <path d="M 150 340 Q 170 320 190 325" />
            <path d="M 150 340 Q 150 310 140 300" />
            <path d="M 150 340 Q 150 310 160 300" />
          </g>
          <g stroke="#162454" strokeWidth="4" fill="none">
            <path d="M 1050 400 L 1050 330" />
            <path d="M 1050 330 Q 1025 310 1000 315" />
            <path d="M 1050 330 Q 1075 310 1100 315" />
            <path d="M 1050 330 Q 1050 300 1038 288" />
            <path d="M 1050 330 Q 1050 300 1062 288" />
          </g>
          <rect x="1100" y="240" width="46" height="160" />
          <rect x="1155" y="290" width="60" height="110" />
          <rect x="1225" y="200" width="40" height="200" />
          <rect x="1275" y="260" width="55" height="140" />
          <rect x="1340" y="230" width="42" height="170" />
        </g>
        <rect x="0" y="340" width="1600" height="60" fill="url(#skylineFade)" />
      </svg>


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
          CalBizHR
        </h1>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mb-4 drop-shadow-md font-light leading-relaxed">
          California HR compliance, built by someone who&apos;d rather earn your trust than your credit card.
        </p>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl mb-12 leading-relaxed">
          Every tool below is free, built by me, and yours to use whether or not you ever hire me for
          the harder, more personal parts of running a team.
        </p>

        {/* CTAs -- free tools lead, booking is secondary and calm */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            render={
              <Link
                href="/tools"
                className="w-full sm:w-auto h-14 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold tracking-wide px-8 rounded-none border border-cyan-400/50 shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] transition-all duration-300 hover:scale-105 font-sans text-base flex items-center justify-center gap-2 group"
              />
            }
          >
            <Calculator className="mr-1 h-4 w-4" /> Explore the Free Tools <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            render={
              <Link
                href="/book"
                className="w-full sm:w-auto h-14 border-white/20 hover:border-cyan-400/60 bg-[#020617]/50 hover:bg-cyan-950/50 backdrop-blur-md text-cyan-50 font-semibold tracking-wide px-8 rounded-none transition-all duration-300 font-sans text-base flex items-center justify-center gap-2"
              />
            }
          >
            Book a $75 Consultation
          </Button>
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
