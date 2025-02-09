"use client";

import { Card } from "@/components/ui/card";
import { SMSChallenge } from "@/components/sms-challenge";
import { WebsiteChallenge } from "@/components/website-challenge";
import { EmailChallenge } from "@/components/email-challenge";
import { useState, useEffect } from "react";
import Image from "next/image";

// Import your assets
import fishBubble1 from "../assets/Fish_Normal_Bubble1.png";
import fishBubble2 from "../assets/Fish_Normal_Bubble2.png";
import seaBackground from "../assets/Sea_extended.png";

export default function GamePage() {
  const [currentFish, setCurrentFish] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFish((prev) => (prev === 0 ? 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        return prev >= 100 ? 0 : prev + 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="flex w-full h-full">
        {/* Left section - Game content (70% width) */}
        <div className="w-[70%] pl-8 pr-3 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6">
            <WebsiteChallenge />
          </Card>
        </div>

        {/* Right section - Graphics (30% width) */}
        <div className="w-[30%] pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 overflow-hidden relative">
            {/* Sea background */}
            <div className="absolute inset-0" style={{ overflow: "hidden" }}>
              <div
                className="w-full h-full"
                style={{
                  position: "relative",
                  width: "2048px",
                  height: "1080px",
                  minHeight: "1080px",
                  transform: `translateX(${-position}px)`,
                  transition: "transform 50ms linear",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${seaBackground.src})`,
                    backgroundSize: "1024px auto",
                    width: "1024px",
                    height: "100%",
                    imageRendering: "pixelated",
                    position: "absolute",
                    left: "0px",
                  }}
                />
                <div
                  style={{
                    backgroundImage: `url(${seaBackground.src})`,
                    backgroundSize: "1024px auto",
                    width: "1024px",
                    height: "100%",
                    imageRendering: "pixelated",
                    position: "absolute",
                    left: "1024px",
                  }}
                />
              </div>
            </div>

            {/* Fish animation */}
            <div
              className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[33%]"
              style={{
                transform: `translate(-50%, ${
                  currentFish === 1 ? "-10px" : "0px"
                })`,
              }}
            >
              <Image
                src={currentFish === 0 ? fishBubble1 : fishBubble2}
                alt="Fish"
                width={0}
                height={0}
                className="w-full h-auto"
                priority
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
