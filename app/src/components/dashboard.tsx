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
    <div className="fixed inset-0 bg-black text-white">
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

      <div className="flex w-full h-full">
        {/* Left section - Stats (1/3 width) */}
        <div className="w-1/3 pl-8 pr-3 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-pixel text-center">Stats</h2>
              <div className="space-y-4">
                <ExpBar
                  current={75}
                  max={100}
                  label="Email Detection"
                  level={3}
                />
                <ExpBar
                  current={30}
                  max={100}
                  label="SMS Detection"
                  level={1}
                />
                <ExpBar
                  current={50}
                  max={100}
                  label="Website Detection"
                  level={2}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right section - Fish avatar and game button (2/3 width) */}
        <div className="w-2/3 pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <span className="text-6xl mb-8 block">🎣</span>
              <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
                <img
                  src="/fish-avatar-placeholder.png"
                  alt="Fish Avatar"
                  className="w-48 h-48 pixel-art"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-1/2 font-pixel py-8 text-xl bg-white/10 hover:bg-white/20 border-white/20"
              onClick={() => router.push("/game")}
            >
              Start Fishing
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
