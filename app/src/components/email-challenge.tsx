"use client";

import { EmailViewer } from "@/components/email-viewer";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";
import { useState, useEffect } from "react";

function generateRandomTimestamp() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() < 0.5 ? "AM" : "PM";
  return `Today ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function EmailChallenge({
  parts,
}: {
  questionId: number;
  parts: {
    id: number;
    question_id: number;
    order: number;
    question_part_content: string;
    is_suspicious: boolean;
  }[];
}) {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();
  const [timestamp, setTimestamp] = useState("Today --:-- --");

  useEffect(() => {
    setTimestamp(generateRandomTimestamp());
  }, []);

  const challengeData = {
    subject:
      parts[0]["question_part_content"] || "Important Account Verification",
    sender: parts[1]["question_part_content"] || "support@banking-secure.com",
    timestamp,
    attachments: [parts[2]["question_part_content"]].filter(Boolean),
    body: parts
      .slice(3)
      .map(
        (part: {
          id: number;
          question_id: number;
          order: number;
          question_part_content: string;
          is_suspicious: boolean;
        }) => part["question_part_content"]
      )
      .filter(Boolean),
  };

  return (
    <ChallengeBase
      instruction="Click on any suspicious elements in this email:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
    >
      <EmailViewer
        sender={challengeData.sender}
        subject={challengeData.subject}
        timestamp={challengeData.timestamp}
        body={challengeData.body}
        attachments={challengeData.attachments}
        onSelect={handleSelect}
        isSelected={isSelected}
      />
    </ChallengeBase>
  );
}
