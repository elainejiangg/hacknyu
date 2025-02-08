"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface PhishingContent {
  text: string;
  redFlags: { start: number; end: number; explanation: string }[];
}

const sampleContent: PhishingContent = {
  text: "Dear valued customer, Your account security needs immediate attention. Click here to verify your information: http://totally-legit-bank.com",
  redFlags: [
    { start: 0, end: 19, explanation: "Generic greeting" },
    { start: 85, end: 109, explanation: "Suspicious URL" },
  ],
};

export function GameScreen() {
  const [hookPosition, setHookPosition] = useState(0);
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  const handleTextClick = (index: number) => {
    const isRedFlag = sampleContent.redFlags.some(
      (flag) => index >= flag.start && index < flag.end
    );
    const isSelected = selectedRanges.includes(index);

    if (!isSelected && !isRedFlag) {
      setHookPosition((prev) => Math.min(prev + 20, 100));
    }

    setSelectedRanges((prev) => {
      if (isSelected) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  return (
    <div className="min-h-screen bg-grid-pattern p-6">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
            <div className="font-mono text-lg whitespace-pre-wrap">
              {sampleContent.text.split("").map((char, i) => {
                const isRedFlag = sampleContent.redFlags.some(
                  (flag) => i >= flag.start && i < flag.end
                );
                const isSelected = selectedRanges.includes(i);

                return (
                  <span
                    key={i}
                    className={`cursor-pointer ${
                      isSelected ? "bg-destructive/20" : ""
                    } ${isRedFlag ? "hover:bg-destructive/10" : ""}`}
                    onClick={() => handleTextClick(i)}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </Card>

          <Card className="bg-black relative">
            <div
              className="absolute right-4 w-px h-full bg-white"
              style={{
                clipPath: `inset(${hookPosition}% 0 0 0)`,
              }}
            >
              <div className="absolute bottom-0 right-0 transform translate-x-1/2">
                <FishHook className="text-white w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FishHook({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v6m0 0a4 4 0 1 0 4 4v-3" />
    </svg>
  );
}
