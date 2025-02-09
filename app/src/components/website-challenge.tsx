"use client";

import { WebsiteViewerSmall } from "@/components/website-viewer-small";
import { WebsiteViewerMedium } from "@/components/website-viewer-medium";
import { WebsiteViewerLarge } from "@/components/website-viewer-large";
import { ChallengeBase } from "@/components/challenge-base";
import { useSelectionState } from "@/hooks/useSelectionState";

export function WebsiteChallenge({
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

  // Small version data (using id as index)
  const smallData = {
    url: parts[0]["question_part_content"] || "secure-paypaI.com/login",
    title: parts[1]["question_part_content"] || "PaypaI",
  };

  return (
    <ChallengeBase
      instruction="Click on any suspicious elements in this website:"
      selectedElements={selectedElements}
      onSelect={handleSelect}
      possibleRedFlags={possibleRedFlags}
      parts={parts}
    >
      <WebsiteViewerSmall
        url={smallData.url}
        title={smallData.title}
        onSelect={handleSelect}
        isSelected={isSelected}
        parts={parts}
      />
    </ChallengeBase>
  );
}
