"use client";

import { useState, useEffect } from "react";
import { Selection } from "@/types/challenge";
import axios from "axios"; // Ensure axios is imported

interface SMSViewerProps {
  sender: string;
  message: string[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
  parts: {
    id: number;
    question_part_content: string;
    is_suspicious: boolean;
  }[];
}

function generateRandomTimestamp() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() < 0.5 ? "AM" : "PM";
  return `Today ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function SMSViewer({
  sender,
  message,
  onSelect,
  isSelected,
  parts,
}: SMSViewerProps) {
  const [timestamp, setTimestamp] = useState("Today --:-- --");

  useEffect(() => {
    setTimestamp(generateRandomTimestamp());
  }, []);

  // Handle clicking on sender (sender's part)
  const handleSenderClick = async () => {
    console.log("Clicked sender:", { type: "sender", index: parts[0].id });

    // API call to add flag to sender
    try {
      const response = await axios.put(
        `http://localhost:3001/answers/${parts[0].id}/add-flag`,
        {
          type: "sender",
        }
      );
      console.log("Flag added:", response.data);
    } catch (error) {
      console.error("Error adding flag:", error);
    }

    if (isSelected("sender", parts[0].id)) {
      onSelect({ type: "sender", index: parts[0].id }); // Will be removed in parent
    } else {
      onSelect({ type: "sender", index: parts[0].id }); // Will be added in parent
    }
  };

  // Handle clicking on message parts (using id from parts)
  const handlePartClick = async (id: number) => {
    console.log("Clicked message part:", {
      type: "message",
      index: id,
      text: message.find((_, idx) => parts[idx].id === id), // Find the content of the part based on id
    });

    // API call to add flag to message part
    try {
      const response = await axios.put(
        `http://localhost:3001/answers/${id}/add-flag`,
        {
          type: "message",
        }
      );
      console.log("Flag added:", response.data);
    } catch (error) {
      console.error("Error adding flag:", error);
    }

    if (isSelected("message", id)) {
      onSelect({ type: "message", index: id }); // Will be removed in parent
    } else {
      onSelect({ type: "message", index: id }); // Will be added in parent
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
                isSelected("sender", parts[0].id)
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
            {message.map((part, index) => (
              <span
                key={parts[index].id} // Use the id as the key for each part
                className={`cursor-pointer transition-colors rounded px-0.5
                  ${
                    isSelected("message", parts[index].id)
                      ? "bg-lime-400/30"
                      : "hover:bg-lime-400/30"
                  }`}
                onClick={() => handlePartClick(parts[index].id)} // Pass the id as the index
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
