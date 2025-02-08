"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { useSelectionState } from "../hooks/useSelectionState";
import { WebsiteChallengeData } from "../types/challenge";
import { WebsiteContent } from "./website-content";
interface BrowserWindowProps {
  url: string;
  children: React.ReactNode;
}

function BrowserWindow({ url, children }: BrowserWindowProps) {
  return (
    <div className="w-full bg-black/20 rounded-xl overflow-hidden border border-white/10">
      {/* Browser chrome/toolbar */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        {/* URL bar */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-white/60">https://</span>
          <span className="text-white/90">{url}</span>
        </div>
      </div>

      {/* Website content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

interface WebsiteContentProps {
  contentParts: {
    type: "title" | "input" | "button" | "footer";
    content: string;
  }[];
  onSelect: (index: number) => void;
  isSelected: (index: number) => boolean;
}

export function WebsiteChallenge(): React.ReactElement {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  const challengeData: WebsiteChallengeData = {
    url: "secure-paypaI.com/login",
    title: "Detect the Phishing Attempt",
    description: "Click on any suspicious elements in this website:",
    contentParts: [
      { type: "title", content: "PaypaI" },
      { type: "input", content: "Enter your email" },
      { type: "input", content: "Enter your password" },
      { type: "button", content: "Log In" },
      { type: "footer", content: "Having trouble logging in?" },
      { type: "footer", content: "Reset your password" },
    ],
    hints: [
      "Misspelled domain (PaypaI with capital I)",
      "Suspicious URL (not paypal.com)",
      "Slightly off brand styling",
    ],
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">{challengeData.title}</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">{challengeData.description}</p>
        <div className="w-full bg-black/20 rounded-xl overflow-hidden">
          <BrowserWindow url={challengeData.url}>
            <WebsiteContent
              contentParts={challengeData.contentParts}
              onSelect={(index) =>
                handleSelect({
                  type: challengeData.contentParts[index].type,
                  index,
                })
              }
              isSelected={(index) =>
                isSelected(challengeData.contentParts[index].type)
              }
            />
          </BrowserWindow>
        </div>
      </div>
    </div>
  );
}
