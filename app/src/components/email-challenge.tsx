"use client";

import { EmailViewer } from "@/components/email-viewer";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";

export function EmailChallenge() {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  const challengeData = {
    sender: "support@banking-secure.com",
    subject: "Important Account Verification",
    timestamp: "Jan 29, 2025, 11:28 AM",
    body: [
      "Dear Customer,",
      "We have detected unusual activity in your account.",
      "To ensure your security, please verify your account immediately by clicking the link below:",
      "www.banking-secure.com/verify",
      "Failure to verify your account may result in temporary suspension.",
      "Thank you for your prompt attention to this matter.",
      "Sincerely,\nCustomer Support Team",
    ],
    attachments: ["report.pdf"],
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
