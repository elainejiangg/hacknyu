import React from "react";
import { useSelectionState } from "../hooks/useSelectionState";
import { EmailChallengeData } from "../types/challenge";
import { EmailViewer } from "./email-viewer";
import { generateTimestamp } from "../utils/time";

export function EmailChallenge(): React.ReactElement {
  const challengeData: EmailChallengeData = {
    title: "Identify the Phishing Email",
    description: "Click on suspicious elements in this email:",
    sender: "support@banking-secure.com",
    subject: "Important Account Verification",
    timestamp: generateTimestamp(true),
    contentParts: [
      { type: "greeting", content: "Dear Customer," },
      {
        type: "body",
        content: "We have detected unusual activity in your account.",
      },
      {
        type: "body",
        content:
          "To ensure your security, please verify your account immediately by clicking the link below:",
      },
      { type: "link", content: "Verify My Account" },
      {
        type: "warning",
        content:
          "Failure to verify your account may result in temporary suspension.",
      },
      { type: "signature", content: "Sincerely, Customer Support Team" },
    ],
    hints: [
      "Generic greeting",
      "Urgent action required",
      "Suspicious sender domain",
      "Threatening language",
    ],
  };

  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">{challengeData.title}</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">{challengeData.description}</p>
        <EmailViewer
          sender={challengeData.sender}
          subject={challengeData.subject}
          timestamp={challengeData.timestamp}
          contentParts={challengeData.contentParts}
          onSelect={handleSelect}
          isSelected={isSelected}
        />
      </div>
    </div>
  );
}

export default EmailChallenge;
