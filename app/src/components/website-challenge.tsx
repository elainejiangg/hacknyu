"use client";
import { Card } from "@/components/ui/card";
import { useSelectionState } from "@/hooks/useSelectionState";
import { Selection } from "@/types/challenge";

interface BrowserWindowProps {
  url: string;
  children: React.ReactNode;
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

function BrowserWindow({
  url,
  children,
  onSelect,
  isSelected,
}: BrowserWindowProps) {
  return (
    <div className="w-full bg-black/20 rounded-xl overflow-hidden border border-white/10">
      {/* Browser chrome/toolbar */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        {/* URL bar */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-white/60">https://</span>
          <span
            className={`text-white/90 cursor-pointer ${
              isSelected("url", -1) ? "bg-lime-400/30" : "hover:bg-lime-400/30"
            }`}
            onClick={() => {
              console.log("Clicked URL");
              onSelect({ type: "url", index: -1 });
            }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Website content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

interface WebsiteContentProps {
  titleParts: string[];
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  buttonText: string;
  footerParts: string[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

function WebsiteContent({
  titleParts,
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  buttonText,
  footerParts,
  onSelect,
  isSelected,
}: WebsiteContentProps) {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-400 mb-2">
          {titleParts.map((part, index) => (
            <span
              key={index}
              className={`cursor-pointer ${
                isSelected("title", index)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log(`Clicked title ${index}`);
                onSelect({ type: "title", index } as Selection);
              }}
            >
              {part}
            </span>
          ))}
        </div>
        <p className="text-white/60">Log in to your account</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-pixel text-white/80">
            Email address
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white/60"
            placeholder={emailPlaceholder}
            disabled
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-pixel text-white/80">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white/60"
            placeholder={passwordPlaceholder}
            disabled
          />
        </div>

        <button
          className="w-full bg-blue-500/80 text-white font-pixel py-3 rounded-lg mt-6"
          disabled
        >
          {buttonText}
        </button>
      </div>

      <div className="text-center text-sm">
        {footerParts.map((part, index) => (
          <div key={index} className="text-center">
            <span
              className={`text-[#0070ba] cursor-pointer ${
                isSelected("footer", index)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log(`Clicked footer ${index}`);
                onSelect({ type: "footer", index });
              }}
            >
              {part}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebsiteChallenge() {
  const { selectedElements, handleSelect, isSelected } = useSelectionState();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">Detect the Phishing Attempt</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">
          Click on any suspicious elements in this website:
        </p>
        <div className="mt-8 mb-8">
          <BrowserWindow
            url="secure-paypaI.com/login"
            onSelect={handleSelect}
            isSelected={isSelected}
          >
            <WebsiteContent
              titleParts={["PaypaI"]}
              buttonText="Log In"
              footerParts={[
                "Having trouble logging in?",
                "Reset your password",
              ]}
              onSelect={handleSelect}
              isSelected={isSelected}
            />
          </BrowserWindow>
        </div>
      </div>
    </div>
  );
}
