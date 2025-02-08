import { ChallengeContent } from "../types/challenge";
import { Selection } from "../hooks/useSelectionState";

type WebsiteContentType = Extract<
  ChallengeContent["type"],
  "title" | "input" | "button" | "footer"
>;

interface WebsiteContentProps {
  contentParts: {
    type: "title" | "input" | "button" | "footer";
    content: string;
  }[];
  onSelect: (index: number) => void;
  isSelected: (index: number) => boolean;
}

export function WebsiteContent({
  contentParts,
  onSelect,
  isSelected,
}: WebsiteContentProps) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#1b1b1b] py-16">
      {/* Logo */}
      <div
        onClick={() => onSelect(0)}
        className={`text-[60px] font-bold text-[#0070ba] mb-16 cursor-pointer ${
          isSelected(0) ? "bg-lime-400/30" : ""
        }`}
      >
        {contentParts[0].content}
      </div>

      {/* Form Container */}
      <div className="w-[350px]">
        {/* Input Fields */}
        {contentParts.slice(1, 3).map((part, index) => (
          <div key={index} className="mb-6">
            <label className="block text-gray-300 text-sm mb-2">
              {index === 0 ? "Email" : "Password"}
            </label>
            <input
              type="text"
              placeholder={part.content}
              onClick={() => onSelect(index + 1)}
              className={`w-[220px] p-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-base outline-none placeholder-gray-500 ${
                isSelected(index + 1)
                  ? "bg-lime-400/30"
                  : "hover:border-[#0070ba]"
              }`}
              readOnly
            />
          </div>
        ))}

        {/* Button */}
        <div className="mb-8">
          <button
            onClick={() => onSelect(3)}
            className={`w-[220px] p-3 bg-[#0070ba] text-white rounded-full text-base font-bold ${
              isSelected(3) ? "bg-lime-400/30" : "hover:bg-[#003087]"
            }`}
          >
            {contentParts[3].content}
          </button>
        </div>

        {/* Footer Links */}
        <div className="space-y-2">
          {contentParts.slice(4).map((part, index) => (
            <div key={index} className="text-center">
              <span
                onClick={() => onSelect(index + 4)}
                className={`text-[#0070ba] text-sm cursor-pointer ${
                  isSelected(index + 4) ? "bg-lime-400/30" : "hover:underline"
                }`}
              >
                {part.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
