import { Selection } from "@/types/challenge";
import axios from "axios"; // Make sure axios is imported

interface EmailViewerProps {
  subject: string;
  sender: string;
  body: string[];
  attachment?: string; // Keep as optional string
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
  parts: {
    id: number;
    question_part_content: string;
    is_suspicious: boolean;
  }[];
}

export function EmailViewer({
  subject,
  sender,
  body,
  attachment, // Single attachment
  onSelect,
  isSelected,
  parts,
}: EmailViewerProps) {
  // Function to trigger the PUT request for flagging the part
  const handleFlag = async (type: Selection["type"], id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/answers/${id}/add-flag`,
        { type }
      );
      console.log(`${type} flagged successfully`, response.data);
    } catch (error) {
      console.error(`Error flagging ${type}:`, error);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-1/4 border-r border-gray-700">
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
      <div className="flex-1 mt-4 p-4 bg-black rounded-lg">
        <div className="mb-4">
          <h3
            className={`font-bold text-xl text-white cursor-pointer ${
              isSelected("subject", parts[0].id)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30"
            }`}
            onClick={() => {
              console.log("Clicked subject");
              onSelect({ type: "subject", index: parts[0].id });
              handleFlag("subject", parts[0].id); // Trigger flagging
            }}
          >
            {subject}
          </h3>
          <p className="text-sm text-gray-400">
            From:{" "}
            <span
              className={`cursor-pointer ${
                isSelected("sender", parts[1].id)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log("Clicked sender");
                onSelect({ type: "sender", index: parts[1].id });
                handleFlag("sender", parts[1].id); // Trigger flagging
              }}
            >
              {sender}
            </span>
            <span className="text-gray-500">
              {" "}
              - {parts[2].question_part_content}
            </span>
          </p>
        </div>

        {/* Email Body */}
        {body.map((line, index) => (
          <p key={parts[index + 3].id} className="font-pixel text-white">
            <span
              className={`cursor-pointer ${
                isSelected("body", parts[index + 3].id)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log(`Clicked body line ${index}`);
                onSelect({ type: "body", index: parts[index + 3].id });
                handleFlag("body", parts[index + 3].id); // Trigger flagging
              }}
            >
              {line}
            </span>
          </p>
        ))}

        {/* Attachment - only show if exists */}
        {attachment && (
          <div
            key={parts[4].id} // Adjust index as needed
            className={`mt-4 p-2 border border-gray-700 rounded cursor-pointer ${
              isSelected("attachment", parts[4].id)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30"
            }`}
            onClick={() => onSelect({ type: "attachment", index: parts[4].id })}
          >
            📎 {attachment}
          </div>
        )}
      </div>
    </div>
  );
}
