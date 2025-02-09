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

export function EmailChallenge() {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();
  const [timestamp, setTimestamp] = useState("Today --:-- --");

  useEffect(() => {
    setTimestamp(generateRandomTimestamp());
  }, []);

  const challengeData = {
    sender: "support@banking-secure.com",
    subject: "Important Account Verification",
    timestamp,
    body: [
      "Dear Customer,",
      "We have detected unusual activity in your account. To ensure your security, please verify your account immediately by clicking the link below:",
      "Verify My Account",
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
