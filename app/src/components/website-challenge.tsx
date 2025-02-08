"use client";

import { Card } from "@/components/ui/card";

interface BrowserWindowProps {
  url: string;
  children: React.ReactNode;
}

function BrowserWindow({ url, children }: BrowserWindowProps) {
  return (
    <div className="w-full bg-black/20 rounded-xl overflow-hidden border border-white/10">
      {/* Browser chrome/toolbar */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        {/* URL bar */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-white/60">https://</span>
          <span className="text-white/90">{url}</span>
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
}

function WebsiteContent({
  titleParts,
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  buttonText,
  footerParts,
}: WebsiteContentProps) {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-400 mb-2">
          {titleParts.map((part, index) => (
            <span
              key={index}
              className="hover:bg-lime-400/30 cursor-pointer transition-colors rounded px-0.5"
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

      <div className="text-center text-sm text-white/40">
        {footerParts.map((part, index) => (
          <p
            key={index}
            className="hover:bg-lime-400/30 cursor-pointer transition-colors rounded px-0.5"
          >
            {part}
          </p>
        ))}
      </div>
    </div>
  );
}

export function WebsiteChallenge() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-pixel">Detect the Phishing Attempt</h2>
      <div className="prose prose-invert">
        <p className="font-pixel text-lg mb-6">
          Click on any suspicious elements in this website:
        </p>
        <div className="mt-8 mb-8">
          <BrowserWindow url="secure-paypaI.com/login">
            <WebsiteContent
              titleParts={["PaypaI"]}
              buttonText="Log In"
              footerParts={[
                "Having trouble logging in?",
                "Reset your password",
              ]}
            />
          </BrowserWindow>
        </div>
        <div className="mt-8 p-6 bg-white/5 rounded-lg">
          <p className="text-base font-pixel text-white/60">
            Suspicious elements:
            <br />- Misspelled domain (PaypaI with capital I)
            <br />- Suspicious URL (not paypal.com)
            <br />- Slightly off brand styling
            <br />- Unusual security certificate
          </p>
        </div>
      </div>
    </div>
  );
}
