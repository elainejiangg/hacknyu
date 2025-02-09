"use client";

import { SMSViewer } from "@/components/sms-viewer";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";

export function SMSChallenge({
  parts,
}: {
  parts: {
    id: number;
    question_id: number;
    order: number;
    question_part_content: string;
    is_suspicious: boolean;
    reason: string;
    user_answered_suspicious: boolean;
  }[];
}) {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  // Calculate possibleRedFlags by counting parts where is_suspicious is true
  const possibleRedFlags = parts.filter((part) => part.is_suspicious).length;

  const smsData = {
    sender: parts[0]["question_part_content"] || "+1 (555) 0123",
    message: parts
      .slice(1)
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
      instruction="Click on any suspicious elements in this text message:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
      possibleRedFlags={possibleRedFlags}
      parts={parts}
    >
      <SMSViewer
        sender={smsData.sender}
        message={smsData.message}
        onSelect={handleSelect}
        isSelected={isSelected}
        parts={parts}
      />
    </ChallengeBase>
  );
}
