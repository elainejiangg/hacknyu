"use client";

import { SMSViewer } from "@/components/sms-viewer";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";

export function SMSChallenge() {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  return (
    <ChallengeBase
      instruction="Click on any suspicious elements in this text message:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
    >
      <SMSViewer
        sender="+1 (555) 0123"
        message={[
          "ALERT: ",
          "Your bank account has been temporarily suspended. ",
          "Urgent action required! ",
          "Click here to verify your identity: ",
          "http://secure-bank-verify.com/login",
          ". ",
          "Reply STOP to opt out.",
        ]}
        onSelect={handleSelect}
        selectedElements={selectedElements}
      />
    </ChallengeBase>
  );
}
