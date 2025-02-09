"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fishNormalBubble1 from "../assets/Fish_Normal_Bubble1.png";

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
    const exp = category?.exp || 0;

    // Linear level calculation (old)
    // level: Math.floor((exp || 0) / 25) + 1, // Level up every 25 exp

    // Logarithmic level calculation
    // Level = 1 + log2(exp/25 + 1)
    // This means:
    // 0 exp = level 1
    // 25 exp = level 2
    // 75 exp = level 3
    // 175 exp = level 4
    // 375 exp = level 5
    // 775 exp = level 6
    // etc...
    const level = exp === 0 ? 1 : Math.floor(Math.log2(exp / 25 + 1)) + 1;

    return {
      current: exp,
      max: Math.pow(2, level) * 25 - 25, // Next level threshold
      level: level,
    };
  };

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Grid background overlay*/}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Tutorial button */}

      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-6 right-6 rounded-full border-white/20 hover:bg-white/10 text-white/50
          border border-white/20 px-4 py-2
          hover:border-white hover:text-white hover:scale-105
          transition-all duration-300 ease-in-out
          z-[9999] cursor-pointer text-sm rounded bg-black"
        onClick={() => router.push("/tutorial")}
      >
        <span className="text-lg">❓</span>
        <span className="sr-only">Tutorial</span>
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

        {/* Right section - Graphics (2/3 width) */}
        <div className="w-2/3 pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 flex flex-col items-center justify-center gap-6 relative">
            {/* Settings and Logout buttons in top-right */}
            <div className="absolute top-4 right-4 flex gap-4">
              <Button
                className="font-pixel text-white/75 text-sm
                  hover:text-white hover:scale-105
                  transition-all duration-300 ease-in-out
                  cursor-pointer bg-transparent
                  hover:bg-transparent focus:bg-transparent active:bg-transparent"
              >
                Settings
              </Button>
              <Button
                className="font-pixel text-white/75 text-sm
                  hover:text-white hover:scale-105
                  transition-all duration-300 ease-in-out
                  cursor-pointer bg-transparent
                  hover:bg-transparent focus:bg-transparent active:bg-transparent"
                onClick={handleLogout}
              >
                Log Out →
              </Button>
            </div>

            {/* Fish avatar and Start Fishing button */}
            <div className="relative">
              <span className="text-6xl mb-8 block text-center">🎣</span>
              <div className="w-64 h-64 rounded-full flex items-center justify-center">
                <img
                  src={fishNormalBubble1.src}
                  alt="Fish Avatar"
                  className="w-64 h-64 pixel-art"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-auto min-w-[200px] font-pixel py-6 text-white/90 px-8 text-2xl
                hover:text-white hover:font-bold hover:scale-105
                transition-all duration-300 ease-in-out
                z-[9999] cursor-pointer
                bg-transparent rounded
                hover:bg-transparent focus:bg-transparent active:bg-transparent"
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
