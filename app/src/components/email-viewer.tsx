import { Selection } from "@/types/challenge";

interface EmailViewerProps {
  sender: string;
  subject: string;
  timestamp: string;
  body: string[];
  attachments: string[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

export function EmailViewer({
  sender,
  subject,
  timestamp,
  body,
  attachments,
  onSelect,
  isSelected,
}: EmailViewerProps) {
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
              isSelected("subject", -1)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30"
            }`}
            onClick={() => {
              console.log("Clicked subject");
              onSelect({ type: "subject", index: -1 });
            }}
          >
            {subject}
          </h3>
          <p className="text-sm text-gray-400">
            From:{" "}
            <span
              className={`cursor-pointer ${
                isSelected("sender", -1)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log("Clicked sender");
                onSelect({ type: "sender", index: -1 });
              }}
            >
              {sender}
            </span>
            <span className="text-gray-500"> - {timestamp}</span>
          </p>
        </div>

        {/* Email Body */}
        {body.map((line, index) => (
          <p key={index} className="font-pixel text-white">
            <span
              className={`cursor-pointer ${
                isSelected("body", index)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log(`Clicked body line ${index}`);
                onSelect({ type: "body", index });
              }}
            >
              {line}
            </span>
          </p>
        ))}

        {/* Attachments */}
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className={`mt-4 p-2 border border-gray-700 rounded cursor-pointer ${
              isSelected("attachment", index)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30"
            }`}
            onClick={() => {
              console.log(`Clicked attachment ${index}`);
              onSelect({ type: "attachment", index });
            }}
          >
            <span className="font-pixel text-white">📎 {attachment}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
