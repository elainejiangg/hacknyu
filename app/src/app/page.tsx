"use client";

import { useState } from "react";
import { Dashboard } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative container max-w-4xl mx-auto h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-pixel pixel-corners bg-white/5 px-8 py-4 inline-block">
            PHISHING SIMULATOR
          </h1>
          <p className="text-lg font-pixel text-white/80 max-w-xl mx-auto">
            Navigate the digital waters, avoid the hooks, and become a master at
            detecting phishing attempts
          </p>
        </div>

        <Card className="w-full max-w-md bg-white/5 border-white/10 p-8 space-y-6">
          <div className="flex flex-col gap-4">
            <Button
              className="w-full font-pixel py-6 bg-white/10 hover:bg-white/20 border-white/20"
              onClick={() => (window.location.href = "/signup")}
            >
              CREATE ACCOUNT
            </Button>
            <Button
              variant="outline"
              className="w-full font-pixel py-6 hover:bg-white/10 border-white/20"
              onClick={() => (window.location.href = "/login")}
            >
              LOG IN
            </Button>
          </div>
        </Card>

        <div className="text-center text-sm font-pixel text-white/60 mt-8">
          Learn to protect yourself in a fun, interactive way
        </div>
      </div>
    </div>
  );
}
