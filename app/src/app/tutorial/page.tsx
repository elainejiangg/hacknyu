"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import UnderwaterParallax from "@/components/UnderwaterParallax";

export default function TutorialPage() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black text-white">
        <UnderwaterParallax />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      </div>
      <div className="min-h-[200vh] relative bg-black">
        <div className="container mx-auto px-4 py-20">
          <div className="space-y-20"></div>
        </div>
      </div>
    </ParallaxProvider>
  );
}
