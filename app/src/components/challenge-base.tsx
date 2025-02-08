"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Selection } from "@/hooks/useSelectionState";

interface ChallengeProps {
  title?: string;
  instruction: string;
  children: ReactNode;
  selectedElements: Selection[];
  onSelect: (selection: Selection) => void;
  hints: string[];
}

export function ChallengeBase({
  title = "Detect the Phishing Attempt",
  instruction,
  children,
  selectedElements,
  onSelect,
  hints,
}: ChallengeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">{title}</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">{instruction}</p>
        <div className="mt-8 mb-8">{children}</div>
        <div className="mt-8 p-6 bg-white/5 rounded-lg">
          <p className="text-base font-pixel text-white/60">
            Suspicious elements:
            {hints.map((hint, i) => (
              <span key={i}>
                <br />- {hint}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
