"use client";

import { useState, useEffect } from "react";
import { Selection } from "@/types/challenge";

interface MessageBubbleProps {
  sender: string;
  messageParts: string[];
  onSelect: (selection: Selection) => void;
  selectedElements: Selection[];
}

function generateRandomTimestamp() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() < 0.5 ? "AM" : "PM";
  return `Today ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function MessageBubble({
  sender,
  messageParts,
  onSelect,
  selectedElements,
}: MessageBubbleProps) {
  const [timestamp, setTimestamp] = useState("Today --:-- --");

  useEffect(() => {
    setTimestamp(generateRandomTimestamp());
  }, []);

  const isSelected = (type: Selection["type"], index: number) =>
    selectedElements.some((el) => el.type === type && el.index === index);

  const handleSenderClick = () => {
    console.log("Clicked sender:", { type: "sender" });
    if (isSelected("sender", -1)) {
      onSelect({ type: "sender", index: -1 }); // Will be removed in parent
    } else {
      onSelect({ type: "sender", index: -1 }); // Will be added in parent
    }
  };

  const handlePartClick = (index: number) => {
    console.log("Clicked message part:", {
      type: "message",
      index,
      text: messageParts[index],
    });
    if (isSelected("message", index)) {
      onSelect({ type: "message", index }); // Will be removed in parent
    } else {
      onSelect({ type: "message", index }); // Will be added in parent
    }
  };

  return (
    <div className="w-full bg-black/20 rounded-xl p-8">
      {/* Header with sender info and timestamp */}
      <div className="text-center mb-4">
        <div className="text-white/60 text-lg font-pixel">
          <span
            className={`cursor-pointer transition-colors rounded px-0.5
              ${
                isSelected("sender", -1)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
            onClick={handleSenderClick}
          >
            {sender}
          </span>
        </div>
        <div className="text-white/40 text-base font-pixel">{timestamp}</div>
      </div>

      {/* Message bubble */}
      <div className="flex justify-start">
        <div className="bg-white/10 rounded-3xl rounded-tl-sm px-6 py-4 max-w-[90%]">
          <p className="text-white font-pixel text-lg leading-relaxed">
            {messageParts.map((part, index) => (
              <span
                key={index}
                className={`cursor-pointer transition-colors rounded px-0.5
                  ${
                    isSelected("message", index)
                      ? "bg-lime-400/30"
                      : "hover:bg-lime-400/30"
                  }`}
                onClick={() => handlePartClick(index)}
              >
                {part}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
