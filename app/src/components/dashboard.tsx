"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface ExpBarProps {
  current: number;
  max: number;
  label: string;
  level: number;
}

function ExpBar({ current, max, label, level }: ExpBarProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-white">
        <div className="text-sm font-pixel">{label}</div>
        <div className="text-sm font-pixel">Level {level}</div>
      </div>
      <div className="h-8 bg-white/10 rounded-full border-2 border-white/20 overflow-hidden relative">
        <div
          className="absolute h-full bg-black transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-pixel text-white">
          {current}/{max}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Settings button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 rounded-full border-white/20 hover:bg-white/10"
      >
        <span className="text-lg">⚙️</span>
        <span className="sr-only">Settings</span>
      </Button>

      <div className="relative container max-w-5xl mx-auto h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-pixel text-center pixel-corners bg-white/5 px-8 py-2 mb-12">
          PHISHING SIMULATOR
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {/* Left section - Progress */}
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
            <ExpBar current={75} max={100} label="Email Detection" level={3} />
            <ExpBar current={30} max={100} label="SMS Detection" level={1} />
            <ExpBar
              current={50}
              max={100}
              label="Website Detection"
              level={2}
            />
          </Card>

          {/* Center section - Fish avatar */}
          <Card className="bg-white/5 border-white/10 flex flex-col items-center justify-center gap-8 p-6">
            <span className="text-4xl mb-4">🎣</span>
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
              <img
                src="/fish-avatar-placeholder.png"
                alt="Fish Avatar"
                className="w-40 h-40 pixel-art"
              />
            </div>
            <Button
              size="lg"
              className="w-full font-pixel py-6 bg-white/10 hover:bg-white/20 border-white/20"
              onClick={() => router.push("/game")}
            >
              Start Fishing
            </Button>
          </Card>

          {/* Right section - Reserved for future use */}
          <Card className="bg-white/5 border-white/10 p-6">
            {/* Content to be added later */}
          </Card>
        </div>
      </div>
    </div>
  );
}
