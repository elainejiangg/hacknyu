"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative container max-w-md mx-auto h-screen flex flex-col items-center justify-center">
        <Card className="w-full bg-white/5 border-white/10 p-8 space-y-6">
          <h1 className="text-2xl font-pixel text-center pixel-corners bg-white/5 px-6 py-2">
            WELCOME BACK
          </h1>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-pixel" htmlFor="email">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-pixel" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <Button
              className="w-full font-pixel py-6 bg-white/10 hover:bg-white/20 border-white/20 mt-6"
              type="submit"
            >
              LOG IN
            </Button>
          </form>

          <div className="text-center text-sm font-pixel text-white/60">
            Need an account?{" "}
            <a href="/signup" className="text-white hover:underline">
              Sign up
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
