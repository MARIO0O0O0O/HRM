"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, ChevronDown } from "lucide-react";

const clips = [
  { id: 1, src: "/video/clip1.mp4", caption: "California HR. Done differently." },
  { id: 2, src: "/video/clip2.mp4", caption: "Protecting your growth." },
  { id: 3, src: "/video/clip3.mp4", caption: "Navigating complexity with ease." },
  { id: 4, src: "/video/clip4.mp4", caption: "Compliance, simplified." },
  { id: 5, src: "/video/clip5.mp4", caption: "Your partner in HR." },
  { id: 6, src: "/video/clip6.mp4", caption: "Expertise you can trust." },
  { id: 7, src: "/video/clip7.mp4", caption: "Strategic. Practical. Essential." },
  { id: 8, src: "/video/clip8.mp4", caption: "Focus on your business." },
  { id: 9, src: "/video/clip9.mp4", caption: "We handle the compliance." },
  { id: 10, src: "/video/clip10.mp4", caption: "Future-proof your workforce." },
];

export default function CinematicHero() {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoError) return;

    const timer = setInterval(() => {
      setCurrentClipIndex((prev) => (prev + 1) % clips.length);
    }, 5000); // Advance every 5 seconds if not relying on video 'ended' event
    return () => clearInterval(timer);
  }, [videoError]);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked or video might not exist
        setVideoError(true);
      });
    }
  }, [currentClipIndex, videoError]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center font-sans">
      {/* Fallback Background (Always present underneath, visible if video fails or before it loads) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#233554] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_50%)]" />
      </div>

      {/* Video Reel */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-opacity duration-1000"
          muted
          playsInline
          autoPlay
          onEnded={() => setCurrentClipIndex((prev) => (prev + 1) % clips.length)}
          onError={() => setVideoError(true)}
        >
          <source src={clips[currentClipIndex].src} type="video/mp4" />
        </video>
      )}

      {/* Overlay to darken video for text readability */}
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

      {/* Cinematic Caption per clip */}
      <div className="absolute bottom-12 left-8 md:left-12 z-10 max-w-sm hidden sm:block">
        <p className="font-playfair italic text-xl md:text-2xl text-white/90 drop-shadow-md transition-opacity duration-500">
          "{clips[currentClipIndex].caption}"
        </p>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 right-8 md:right-12 z-10 flex gap-2">
        {clips.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentClipIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentClipIndex ? "bg-[#d4af37] scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to clip ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-70 hidden md:flex">
        <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase mb-2">Scroll</span>
        <ChevronDown className="h-4 w-4 text-white/70" />
      </div>
    </section>
  );
}
