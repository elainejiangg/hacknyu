"use client";

import { Card } from "@/components/ui/card";
import { SMSChallenge } from "@/components/sms-challenge";
import { WebsiteChallenge } from "@/components/website-challenge";
import { EmailChallenge } from "@/components/email-challenge";

export default function GamePage() {
  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex w-full h-full">
        {/* Left section - Game content (70% width) */}
        <div className="w-[70%] p-6">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            <WebsiteChallenge />
            {/* <SMSChallenge /> */}
            {/* <EmailChallenge /> */}
          </Card>
        </div>

        {/* Right section - Graphics (30% width) */}
        <div className="w-[30%] p-6">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            {/* This will be your fish and hook graphics */}
            <div className="h-full flex items-center justify-center">
              <p className="text-white/60 font-pixel">
                Graphics coming soon...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
