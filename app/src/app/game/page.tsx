"use client";

import { Card } from "@/components/ui/card";
import { SMSChallenge } from "@/components/sms-challenge";
import { WebsiteChallenge } from "@/components/website-challenge";
import { EmailChallenge } from "@/components/email-challenge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="flex w-full h-full">
        {/* Left section - Game content (70% width) */}
        <div className="w-[70%] pl-8 pr-3 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-12">
            <WebsiteChallenge />
            {/* <SMSChallenge /> */}
            {/* <EmailChallenge /> */}
          </Card>
        </div>

        {/* Right section - Graphics (30% width) */}
        <div className="w-[30%] pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 relative">
            {/* Dashboard button in top-right */}
            <div className="absolute top-4 right-4">
              <Button
                className="font-pixel text-white/50 text-sm
                  hover:text-white hover:scale-105
                  transition-all duration-300 ease-in-out
                  cursor-pointer bg-transparent
                  hover:bg-transparent focus:bg-transparent active:bg-transparent"
                onClick={() => router.push("/dashboard")}
              >
                ← dashboard
              </Button>
            </div>

            {/* Graphics content */}
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
