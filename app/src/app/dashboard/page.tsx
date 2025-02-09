"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryExp {
  categoryId: number;
  categoryName: string;
  exp: number;
}

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

export default function Dashboard() {
  const router = useRouter();
  const [categoryExps, setCategoryExps] = useState<CategoryExp[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExps = async () => {
      try {
        const response = await fetch("http://localhost:3001/questions/exp", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.log("No categories found");
            setCategoryExps([]); // Set empty array for new users
            return;
          }
          throw new Error("Failed to fetch exp data");
        }

        const data = await response.json();
        console.log("Exp data:", data);
        setCategoryExps(data);
      } catch (err) {
        setError("Failed to load stats");
        console.error("Error fetching exps:", err);
      }
    };

    fetchExps();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Helper function to get exp data for a category
  const getCategoryExp = (name: string) => {
    const categoryMap: { [key: string]: number } = {
      website: 1,
      sms: 2,
      email: 3,
    };

    const category = categoryExps.find(
      (c) => c.categoryId === categoryMap[name.toLowerCase()]
    );
    return {
      current: category?.exp || 0,
      max: 100,
      level: Math.floor((category?.exp || 0) / 25) + 1, // Level up every 25 exp
    };
  };

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Tutorial button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-6 right-6 rounded-full border-white/20 hover:bg-white/10"
        onClick={() => router.push("/tutorial")}
      >
        <span className="text-lg">❓</span>
        <span className="sr-only">Tutorial</span>
      </Button>

      {/* Settings button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 rounded-full border-white/20 hover:bg-white/10"
      >
        <span className="text-lg">⚙️</span>
        <span className="sr-only">Settings</span>
      </Button>

      {/* Logout button */}
      <Button
        variant="outline"
        className="absolute border rounded border-white top-6 right-20 font-pixel border-white/20 text-black hover:text-white hover:bg-white/10 px-6"
        onClick={handleLogout}
      >
        <span className="text-lg mr-2">🚪</span>
        <span className="font-pixel">Logout</span>
      </Button>

      <div className="flex w-full h-full">
        {/* Left section - Stats (1/3 width) */}
        <div className="w-1/3 pl-8 pr-3 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-pixel text-center">Stats</h2>
              {error ? (
                <div className="text-red-500 text-center font-pixel">
                  {error}
                </div>
              ) : (
                <div className="space-y-4">
                  <ExpBar
                    {...getCategoryExp("email")}
                    label="Email Detection"
                  />
                  <ExpBar {...getCategoryExp("sms")} label="SMS Detection" />
                  <ExpBar
                    {...getCategoryExp("website")}
                    label="Website Detection"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right section - Fish avatar and game button (2/3 width) */}
        <div className="w-2/3 pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <span className="text-6xl mb-8 block text-center">🎣</span>
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
