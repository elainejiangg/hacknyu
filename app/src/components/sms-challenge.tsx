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

export function SMSChallenge({ data, parts }: ChallengeProps) {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  const smsData = {
    sender: parts.sender || "+1 (555) 0123",
    message: parts.message || [
      "ALERT: ",
      "Your bank account has been temporarily suspended. ",
      "Urgent action required! ",
      "Click here to verify your identity: ",
      "http://secure-bank-verify.com/login",
      ". ",
      "Reply STOP to opt out.",
    ],
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
