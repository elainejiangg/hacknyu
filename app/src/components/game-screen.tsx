"use client";

import { Card } from "@/components/ui/card";

export function GameScreen() {
  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex h-screen">
        {/* Left section - Game content (70% width) */}
        <div className="w-[70%] p-6">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            {/* This will contain your phishing detection content */}
            <div className="space-y-4">
              <h2 className="text-xl font-pixel">
                Detect the Phishing Attempt
              </h2>
              <div className="prose prose-invert">
                {/* Example content - replace with your actual game content */}
                <p className="font-pixel">
                  Click on any suspicious elements in the content below:
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  {/* This will be your interactive content */}
                  <p>
                    Content with clickable suspicious elements will go here...
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right section - Graphics (30% width) */}
        <div className="w-[30%] p-6">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            {/* This will be your fish and hook graphics */}
            <div className="h-full flex items-center justify-center">
              <p className="text-white/60 font-pixel">
                Graphics coming soon...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
