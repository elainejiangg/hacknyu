"use client";

import { useState, useEffect } from "react";
import { Selection } from "../hooks/useSelectionState";
import { ChallengeContent } from "../types/challenge";

interface MessageBubbleProps {
  sender: string;
  timestamp: string;
  contentParts: ChallengeContent[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index?: number) => boolean;
}

function generateRandomTimestamp() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() < 0.5 ? "AM" : "PM";
  return `Today ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function MessageBubble({
  sender,
  timestamp,
  contentParts,
  onSelect,
  isSelected,
}: MessageBubbleProps) {
  const [localTimestamp, setLocalTimestamp] = useState("Today --:-- --");

  useEffect(() => {
    setLocalTimestamp(generateRandomTimestamp());
  }, []);

  const handleSenderClick = () => {
    console.log("Clicked sender:", { type: "sender" });
    onSelect({ type: "sender" });
  };

  const handlePartClick = (index: number) => {
    console.log("Clicked message part:", {
      type: "message",
      index,
      text: contentParts[index].content,
    });
    onSelect({ type: "message", index });
  };

  return (
    <div className="w-full bg-black/20 rounded-xl p-8">
      {/* Header with sender info and timestamp */}
      <div className="text-center mb-4">
        <div className="text-white/60 text-lg font-pixel">
          <span
            className={`cursor-pointer transition-colors rounded px-0.5
              ${
                isSelected("sender") ? "bg-lime-400/30" : "hover:bg-lime-400/30"
              }`}
            onClick={handleSenderClick}
          >
            {sender}
          </span>
        </div>
        <div className="text-white/40 text-base font-pixel">
          {localTimestamp}
        </div>
      </div>

      {/* Message bubble */}
      <div className="flex justify-start">
        <div className="bg-white/10 rounded-3xl rounded-tl-sm px-6 py-4 max-w-[90%]">
          <p className="text-white font-pixel text-lg leading-relaxed">
            {contentParts.map((part, index) => (
              <span
                key={index}
                className={`cursor-pointer transition-colors rounded px-0.5
                  ${
                    isSelected("message", index)
                      ? "bg-lime-400/30"
                      : "hover:bg-lime-400/30"
                  }`}
                onClick={() => {
                  console.log("SMS selection:", {
                    type: part.type,
                    index,
                    content: part.content,
                  });
                  onSelect({ type: part.type, index });
                }}
              >
                {part.content}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
