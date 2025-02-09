"use client";

import { SMSViewer } from "@/components/sms-viewer";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";

interface ChallengeProps {
  data: {
    questionId: number;
    // Add other properties from your data as needed
  };
  parts: {
    sender?: string;
    message?: string[];
  };
}

export function SMSChallenge({
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

    // parts.message || [
    //   "ALERT: ",
    //   "Your bank account has been temporarily suspended. ",
    //   "Urgent action required! ",
    //   "Click here to verify your identity: ",
    //   "http://secure-bank-verify.com/login",
    //   ". ",
    //   "Reply STOP to opt out.",
    // ],
  };

  return (
    <ChallengeBase
      instruction="Click on any suspicious elements in this text message:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
    >
      <SMSViewer
        sender={smsData.sender}
        message={smsData.message}
        onSelect={handleSelect}
        selectedElements={selectedElements}
      />
    </ChallengeBase>
  );
}
