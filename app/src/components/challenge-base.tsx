"use client";

import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { Selection } from "@/types/challenge";
import axios from "axios";

interface ChallengeProps {
  title?: string;
  instruction: string;
  children: ReactNode;
  selectedElements: Selection[];
  possibleRedFlags: number;
  onSelect: (selection: Selection) => void;
  parts: {
    id: number;
    question_id: number;
    order: number;
    question_part_content: string;
    is_suspicious: boolean;
    user_answered_suspicious: boolean;
    reason?: string; // Make reason optional
  }[];
}

export function ChallengeBase({
  title = "Detect the Phishing Attempt",
  instruction,
  children,
  selectedElements,
  possibleRedFlags,
  onSelect,
  parts = [],
}: ChallengeProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  const handleSelect = (selection: Selection) => {
    if (selection.type === "submit") {
      setShowAnswers(true); // Just show answers
      return; // Don't call onSelect for submit
    }

    if (selectedElements.length >= possibleRedFlags) {
      return; // Prevent selecting more elements than possible flags
    }
    onSelect(selection);
  };

  const handleSubmit = () => {
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full space-y-4 overflow-hidden">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-pixel">{title}</h2>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 border border-white/40 text-white rounded font-pixel hover:bg-white/20 transition-colors"
              onClick={() => handleSelect({ type: "submit", index: 0 })}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 border border-white/40 text-white rounded font-pixel hover:bg-white/20 transition-colors"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
        <p className="text-right text-white/70">
          There are <span className="font-bold">{possibleRedFlags}</span>{" "}
          possible 🚩. You have selected{" "}
          <span className="font-bold">{selectedElements.length}</span>.
        </p>
      </div>
      <p className="font-pixel text-lg mb-4">{instruction}</p>
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="h-full overflow-y-auto -webkit-overflow-scrolling">
          {children}
        </div>
      </div>
      {showAnswers && parts && (
        <div className="mt-8 p-4 bg-black/30 rounded-lg">
          <h3 className="font-pixel text-lg mb-4">
            Suspicious Elements Explained:
          </h3>
          {parts
            .filter((part) => part.is_suspicious)
            .map((part, index) => (
              <div
                key={index}
                className="mb-4 p-3 border border-white/20 rounded"
              >
                <p className="font-mono text-white/90">
                  "{part.question_part_content}"
                </p>
                <p className="mt-2 text-white/70">🚩 {part.reason}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
