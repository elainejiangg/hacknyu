"use client";

import React from "react";
import { MessageBubble } from "@/components/message-bubble";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";
import { SMSChallengeData } from "../types/challenge";
import { generateTimestamp } from "../utils/time";

export function SMSChallenge(): React.ReactElement {
  const challengeData: SMSChallengeData = {
    title: "Spot the SMS Scam",
    description: "Click on suspicious parts of this text message:",
    sender: "+1 (555) 0123",
    timestamp: generateTimestamp(),
    contentParts: [
      { type: "message", content: "Your account has been locked." },
      {
        type: "message",
        content: "Click here to verify: http://bit.ly/3xF4ke",
      },
      {
        type: "message",
        content: "Respond immediately to prevent account closure.",
      },
    ],
    hints: [
      "Urgent language to pressure action",
      "Suspicious shortened URL",
      "Unknown sender number",
    ],
  };

  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">{challengeData.title}</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">{challengeData.description}</p>
        <MessageBubble
          sender={challengeData.sender}
          timestamp={generateTimestamp()}
          contentParts={challengeData.contentParts}
          onSelect={handleSelect}
          isSelected={isSelected}
        />
      </div>
    </div>
  );
}
