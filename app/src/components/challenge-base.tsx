"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Selection } from "@/types/challenge";

interface ChallengeProps {
  title?: string;
  instruction: string;
  children: ReactNode;
  selectedElements: Selection[];
  onSelect: (selection: Selection) => void;
}

export function ChallengeBase({
  title = "Detect the Phishing Attempt",
  instruction,
  children,
  selectedElements,
  onSelect,
}: ChallengeProps) {
  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      <h2 className="text-xl font-pixel">{title}</h2>
      <p className="font-pixel text-lg mb-4">{instruction}</p>
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="h-full overflow-y-auto -webkit-overflow-scrolling">
          {children}
        </div>
      </div>
    </div>
  );
}
