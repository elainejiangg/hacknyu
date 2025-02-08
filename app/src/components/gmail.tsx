import React, { useState } from "react";

const Gmail: React.FC = () => {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleHighlight = (component: string) => {
    setHighlighted((prev) => (prev === component ? null : component));
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-1/4 border-r border-gray-700">
        {" "}
        {/* Smaller sidebar for Gmail categories */}
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
        {" "}
        {/* Black background for email message portion */}
        {/* Email Header */}
        <div className="mb-4">
          <h3
            className={`font-bold text-xl ${
              highlighted === "header"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "header" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("header")}
            onMouseEnter={() => setHovered("header")}
            onMouseLeave={() => setHovered(null)}
          >
            Important Account Verification
          </h3>
          <p
            className={`text-gray-400 text-sm ${
              highlighted === "timestamp"
                ? "text-yellow-500 bg-lime-200"
                : "text-gray-400"
            } ${hovered === "timestamp" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("timestamp")}
            onMouseEnter={() => setHovered("timestamp")}
            onMouseLeave={() => setHovered(null)}
          >
            From: support@banking-secure.com{" "}
            <span className="text-gray-500">- Jan 29, 2025, 11:28 AM</span>
          </p>
        </div>
        {/* Email Body */}
        <div className="mb-4">
          <p
            className={`text-white font-pixel ${
              highlighted === "greeting"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "greeting" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("greeting")}
            onMouseEnter={() => setHovered("greeting")}
            onMouseLeave={() => setHovered(null)}
          >
            Dear Customer,
          </p>
          <p
            className={`text-white font-pixel ${
              highlighted === "warning"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "warning" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("warning")}
            onMouseEnter={() => setHovered("warning")}
            onMouseLeave={() => setHovered(null)}
          >
            We have detected unusual activity in your account. To ensure your
            security, please verify your account immediately by clicking the
            link below:
          </p>
          <p
            className={`text-blue-500 font-pixel ${
              highlighted === "link"
                ? "text-yellow-500 bg-lime-200"
                : "text-blue-500"
            } ${hovered === "link" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("link")}
            onMouseEnter={() => setHovered("link")}
            onMouseLeave={() => setHovered(null)}
          >
            <a href="http://fake-link.com/verify" className="underline">
              Verify My Account
            </a>
          </p>
          <p
            className={`text-white font-pixel ${
              highlighted === "suspension"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "suspension" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("suspension")}
            onMouseEnter={() => setHovered("suspension")}
            onMouseLeave={() => setHovered(null)}
          >
            Failure to verify your account may result in temporary suspension.
          </p>
          <p
            className={`text-white font-pixel ${
              highlighted === "thanks"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "thanks" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("thanks")}
            onMouseEnter={() => setHovered("thanks")}
            onMouseLeave={() => setHovered(null)}
          >
            Thank you for your prompt attention to this matter.
          </p>
          <p
            className={`text-white font-pixel ${
              highlighted === "signature"
                ? "text-yellow-500 bg-lime-200"
                : "text-white"
            } ${hovered === "signature" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("signature")}
            onMouseEnter={() => setHovered("signature")}
            onMouseLeave={() => setHovered(null)}
          >
            Sincerely,
            <br />
            Customer Support Team
          </p>
          <button
            className={`bg-gray-600 text-white px-4 py-2 rounded mt-2 ${
              highlighted === "report" ? "bg-yellow-500" : "bg-gray-600"
            } ${hovered === "report" ? "bg-lime-200" : ""}`}
            onClick={() => handleHighlight("report")}
            onMouseEnter={() => setHovered("report")}
            onMouseLeave={() => setHovered(null)}
          >
            Report not spam
          </button>
        </div>
        {/* Attachments Section */}
        <div className="border-t border-gray-300 pt-4">
          <p className="text-gray-400">One attachment • Scanned by Gmail</p>
          <img
            src="attachment-image-url"
            alt="Attachment"
            className="mt-2 w-full h-auto"
          />
        </div>
        {/* Monochromatic buttons for Reply and Forward */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Reply
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gmail;
