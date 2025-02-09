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

interface EmailChallengeProps {
  parts: {
    id: number;
    question_id: number;
    order: number;
    question_part_content: string;
    is_suspicious: boolean;
    user_answered_suspicious: boolean;
  }[];
}

export function EmailChallenge({ parts }: EmailChallengeProps) {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();
  const [timestamp, setTimestamp] = useState("Today --:-- --");
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  // Map parts to their order for frontend indexing
  const partsMap = parts.reduce((acc, part) => {
    acc[part.order] = part;
    return acc;
  }, {} as Record<number, (typeof parts)[0]>);

  useEffect(() => {
    setTimestamp(generateRandomTimestamp());
  }, []);

  // Calculate total number of suspicious elements
  useEffect(() => {
    const totalSuspiciousCount = parts.filter(
      (part) => part.is_suspicious
    ).length;
    setNumCorrectAnswers(totalSuspiciousCount); // Set this as the total possible flags
  }, [parts]);

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
    numRedFlags: parts.filter((part) => part.is_suspicious).length,
  };

  return (
    <ChallengeBase
      instruction="Click on any suspicious elements in this email:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
      possibleRedFlags={numCorrectAnswers} // This should now show the correct total
      parts={parts}
    >
      <EmailViewer
        subject={challengeData.subject}
        sender={challengeData.sender}
        body={challengeData.body}
        attachment={challengeData.attachments[0]}
        onSelect={handleSelect}
        isSelected={isSelected}
        parts={parts}
      />
    </ChallengeBase>
  );
}
