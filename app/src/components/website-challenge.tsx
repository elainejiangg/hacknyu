// "use client";

// import { WebsiteViewerSmall } from "@/components/website-viewer-small";
// import { WebsiteViewerMedium } from "@/components/website-viewer-medium";
// import { WebsiteViewerLarge } from "@/components/website-viewer-large";
// import { ChallengeBase } from "@/components/challenge-base";
// import { useSelectionState } from "@/hooks/useSelectionState";

// export function WebsiteChallenge({
//   parts,
// }: {
//   questionId: number;
//   parts: {
//     id: number;
//     question_id: number;
//     order: number;
//     question_part_content: string;
//     is_suspicious: boolean;
//   }[];
// }) {
//   const { selectedElements, handleSelect, isSelected } = useSelectionState();

//   // Small version data
//   const smallData = {
//     url: parts[0]["question_part_content"] || "secure-paypaI.com/login",
//     title: parts[1]["question_part_content"] || "PaypaI",
//   };

//   // Medium version data
//   // const mediumData = {
//   //   url: "secure-account-verify.net/claim",
//   //   title: "Claim Your Prize!",
//   //   mainText: [
//   //     "Congratulations! You've been selected as one of our lucky winners.",
//   //     "Your unclaimed prize of $1,000,000 is waiting for you.",
//   //     "Click below to verify your identity and claim your prize immediately.",
//   //   ],
//   //   buttonText: "Claim Now",
//   // };

//   // // Large version data
//   // const largeData = {
//   //   url: "tax-refund-portal.gov.org/claim-refund",
//   //   title: "IRS Tax Refund Portal",
//   //   mainText: [
//   //     "Important Notice: You have an unclaimed tax refund waiting.",
//   //     "Our records indicate that you are eligible for an additional refund of $4,829.73 from your 2022 tax return.",
//   //     "To process your refund, please verify your information below and provide payment details for direct deposit.",
//   //   ],
//   //   formSections: [
//   //     {
//   //       title: "Personal Information",
//   //       fields: [
//   //         {
//   //           label: "Full Name",
//   //           type: "text",
//   //           placeholder: "Enter your full name",
//   //         },
//   //         {
//   //           label: "Social Security Number",
//   //           type: "text",
//   //           placeholder: "XXX-XX-XXXX",
//   //         },
//   //         { label: "Date of Birth", type: "date", placeholder: "MM/DD/YYYY" },
//   //         { label: "Phone Number", type: "tel", placeholder: "(XXX) XXX-XXXX" },
//   //       ],
//   //     },
//   //     {
//   //       title: "Bank Details",
//   //       fields: [
//   //         { label: "Bank Name", type: "text", placeholder: "Enter bank name" },
//   //         {
//   //           label: "Account Number",
//   //           type: "text",
//   //           placeholder: "Enter account number",
//   //         },
//   //         {
//   //           label: "Routing Number",
//   //           type: "text",
//   //           placeholder: "Enter routing number",
//   //         },
//   //         {
//   //           label: "Account Type",
//   //           type: "text",
//   //           placeholder: "Checking or Savings",
//   //         },
//   //       ],
//   //     },
//   //   ],
//   //   buttonText: "Claim Your Refund Now",
//   //   footerLinks: [
//   //     "Need help? Contact support",
//   //     "Privacy Policy",
//   //     "Terms of Service",
//   //     "IRS.gov",
//   //   ],
//   // };

//   // Use small version by default, uncomment medium version to switch
//   return (
//     <ChallengeBase
//       instruction="Click on any suspicious elements in this website:"
//       selectedElements={selectedElements}
//       onSelect={handleSelect}
//     >
//       <WebsiteViewerSmall
//         url={smallData.url}
//         title={smallData.title}
//         onSelect={handleSelect}
//         isSelected={isSelected}
//       />

//       {/* <WebsiteViewerMedium
//         url={mediumData.url}
//         title={mediumData.title}
//         mainText={mediumData.mainText}
//         buttonText={mediumData.buttonText}
//         onSelect={handleSelect}
//         isSelected={isSelected}
//       /> */}

//       {/* <WebsiteViewerLarge
//         url={largeData.url}
//         title={largeData.title}
//         mainText={largeData.mainText}
//         formSections={largeData.formSections}
//         buttonText={largeData.buttonText}
//         footerLinks={largeData.footerLinks}
//         onSelect={handleSelect}
//         isSelected={isSelected}
//       /> */}
//     </ChallengeBase>
//   );
// }

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
      possibleRedFlags={possibleRedFlags} // Pass possibleRedFlags here
    >
      <WebsiteViewerSmall
        parts={parts} // Passing the whole parts array
        onSelect={handleSelect}
        isSelected={isSelected}
      />
    </ChallengeBase>
  );
}
