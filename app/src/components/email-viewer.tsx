import React from "react";
import { ChallengeContent } from "../types/challenge";
import { Selection } from "../hooks/useSelectionState";

interface EmailViewerProps {
  sender: string;
  subject: string;
  timestamp: string;
  contentParts: { type: Selection["type"]; content: string }[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

export function EmailViewer({
  sender,
  subject,
  timestamp,
  contentParts,
  onSelect,
  isSelected,
}: EmailViewerProps) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="flex flex-col w-1/4 border-r border-gray-700 p-4">
        <h2 className="text-lg font-pixel mb-4">Fishmail</h2>
        <ul className="space-y-2">
          <li className="text-white/60 font-pixel">Inbox</li>
          <li className="text-white/60 font-pixel">Starred</li>
          <li className="text-white/60 font-pixel">Sent</li>
          <li className="text-white/60 font-pixel">Drafts</li>
          <li className="text-white/60 font-pixel">Spam</li>
          <li className="text-white/60 font-pixel">Trash</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg">
          {/* Email Header */}
          <div className="p-4">
            <div className="text-gray-400">
              <div
                onClick={() => {
                  console.log("Email selection:", {
                    type: "sender",
                    index: -1,
                    content: sender,
                  });
                  onSelect({ type: "sender", index: -1 });
                }}
                className={`mb-1 cursor-pointer rounded px-1 ${
                  isSelected("sender", -1)
                    ? "bg-lime-400/30"
                    : "hover:bg-lime-400/30"
                }`}
              >
                From: <span className="text-gray-100">{sender}</span>
              </div>
              <div
                onClick={() => {
                  console.log("Email selection:", {
                    type: "subject",
                    index: -2,
                    content: subject,
                  });
                  onSelect({ type: "subject", index: -2 });
                }}
                className={`mb-1 cursor-pointer rounded px-1 ${
                  isSelected("subject", -2)
                    ? "bg-lime-400/30"
                    : "hover:bg-lime-400/30"
                }`}
              >
                Subject:{" "}
                <span className="text-gray-100 font-semibold">{subject}</span>
              </div>
              <div className="text-sm">{timestamp}</div>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-4 space-y-2">
            {contentParts.map((part, index) => {
              const baseClasses = "cursor-pointer p-1.5 rounded";
              const selectedClasses = isSelected(part.type, index)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30";

              if (part.type === "link") {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log("Email selection:", {
                        type: part.type,
                        index,
                        content: part.content,
                      });
                      onSelect({ type: part.type, index });
                    }}
                    className={`${baseClasses} ${selectedClasses} text-blue-400 underline`}
                  >
                    {part.content}
                  </div>
                );
              }

              if (part.type === "warning") {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      console.log("Email selection:", {
                        type: part.type,
                        index,
                        content: part.content,
                      });
                      onSelect({ type: part.type, index });
                    }}
                    className={`${baseClasses} ${selectedClasses} text-red-400 font-semibold`}
                  >
                    {part.content}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log("Email selection:", {
                      type: part.type,
                      index,
                      content: part.content,
                    });
                    onSelect({ type: part.type, index });
                  }}
                  className={`${baseClasses} ${selectedClasses}`}
                >
                  {part.content}
                </div>
              );
            })}
          </div>

          {/* Attachment */}
          <div className="p-4">
            <div
              onClick={() => {
                console.log("Email selection:", {
                  type: "attachment",
                  index: contentParts.length,
                  content: "account_verification.pdf",
                });
                onSelect({ type: "attachment", index: contentParts.length });
              }}
              className={`bg-gray-700/50 p-3 rounded cursor-pointer ${
                isSelected("attachment", contentParts.length)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-200">
                    account_verification.pdf
                  </div>
                  <div className="text-xs text-gray-400">
                    PDF Document - 1.2MB
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Actions */}
          <div className="p-2 flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-700/80 rounded">
              Reply
            </button>
            <button className="px-3 py-1 text-sm bg-gray-700/80 rounded">
              Forward
            </button>
            <button className="px-3 py-1 text-sm bg-gray-700/80 rounded">
              Report not spam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
