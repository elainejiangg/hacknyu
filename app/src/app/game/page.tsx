"use client";

import { Card } from "@/components/ui/card";
import { SMSChallenge } from "@/components/sms-challenge";
import { WebsiteChallenge } from "@/components/website-challenge";
import { EmailChallenge } from "@/components/email-challenge";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Import your assets
import fishNormalBubble1 from "../assets/Fish_Normal_Bubble1.png";
import fishNormalBubble2 from "../assets/Fish_Normal_Bubble2.png";
import fishAnnoyedBubble1 from "../assets/Fish_Annoyed_Bubble1.png";
import fishAnnoyedBubble2 from "../assets/Fish_Annoyed_Bubble2.png";
import seaBackground from "../assets/Sea_extended.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HookBlack from "@/app/assets/Hook_Black.png";

const DIFFICULTY = {
  EASY: { backgroundSize: "1024px" },
  MEDIUM: { backgroundSize: "600px" },
  HARD: { backgroundSize: "200px" },
} as const;

export default function GamePage() {
  const router = useRouter();

  const [currentFish, setCurrentFish] = useState(0);
  const [position, setPosition] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const [questionParts, setQuestionParts] = useState(null);
  const [questionCategory, setQuestionCategory] = useState(null);
  const [questionID, setQuestionID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDifficulty, setCurrentDifficulty] = useState(DIFFICULTY.MEDIUM);
  const [hookPosition, setHookPosition] = useState(-100); // Start above screen

  const questionGenerated = useRef(false);

  // generate Question
  useEffect(() => {
    const generateQuestion = async () => {
      // If question was already generated, don't generate again
      if (questionGenerated.current) return;

      try {
        questionGenerated.current = true; // Mark as generated before the fetch

        const response = await fetch(
          "http://localhost:3001/questions/generate-question",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate question");
          setIsLoading(false);
          return;
        }
        const data = await response.json();

        console.log(data);
        setQuestionData(data);
        setQuestionID(data.questionId);
        console.log(questionID);

        const [partsResponse, categoryResponse] = await Promise.all([
          fetch(
            `http://localhost:3001/questions/${data.questionId}/questionParts`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(`http://localhost:3001/questions/${data.questionId}/category`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!partsResponse.ok || !categoryResponse.ok) {
          throw new Error("Failed to fetch question details");
          setIsLoading(false);
          return;
        }

        const partsData = await partsResponse.json();
        const categoryData = await categoryResponse.json();

        setQuestionParts(partsData);
        setQuestionCategory(categoryData.categoryId);
        console.log("QUESTION CAT: ", questionCategory);

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    generateQuestion();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFish((prev) =>
        prev === 0 ? 1 : prev === 1 ? 2 : prev === 2 ? 3 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Use a smoother transition with CSS transform
        return (prev + 3) % 1000; // This creates a continuous loop without jumps
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Gradually move hook down
    const interval = setInterval(() => {
      setHookPosition((prev) => {
        if (prev >= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev + 2; // Adjust speed by changing this number
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <p className="font-pixel">Loading challenge...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="flex w-full h-full">
        {/* Left section - Game content (70% width) */}
        <div className="w-[70%] pl-8 pr-3 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-12">
            {questionData && questionParts && questionCategory && (
              <div>
                {questionCategory === 1 && (
                  <WebsiteChallenge
                    questionId={questionID}
                    parts={questionParts["questionParts"]}
                  />
                )}
                {questionCategory === 2 && (
                  <SMSChallenge
                    questionId={questionID}
                    parts={questionParts["questionParts"]}
                  />
                )}
                {questionCategory === 3 && (
                  <EmailChallenge
                    questionId={questionID}
                    parts={questionParts["questionParts"]}
                  />
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Right section - Graphics (30% width) */}
        <div className="w-[30%] pl-3 pr-8 py-4">
          <Card className="h-full bg-white/5 border-white/10 p-6 relative">
            {/* Dashboard button in top-right */}
            <div className="absolute top-4 right-4">
              <Button
                className="font-pixel text-white/50 text-sm
                  hover:text-white hover:font-bold hover:scale-105
                  transition-all duration-300 ease-in-out
                  cursor-pointer bg-transparent
                  hover:bg-transparent focus:bg-transparent active:bg-transparent"
                onClick={() => router.push("/dashboard")}
              >
                ← dashboard
              </Button>
            </div>

            {/* Graphics content */}
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
                    backgroundSize: `${currentDifficulty.backgroundSize} auto`,
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
                    backgroundSize: `${currentDifficulty.backgroundSize} auto`,
                    width: "1024px",
                    height: "100%",
                    imageRendering: "pixelated",
                    position: "absolute",
                    left: "1024px",
                  }}
                />

                <div
                  style={{
                    backgroundImage: `url(${seaBackground.src})`,
                    backgroundSize: `${currentDifficulty.backgroundSize} auto`,
                    width: "1024px",
                    height: "100%",
                    imageRendering: "pixelated",
                    position: "absolute",
                    left: "1024px",
                  }}
                />
              </div>
            </div>

            {/* Fish and Hook container */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[33%]">
              {/* Hook */}
              <div
                className="absolute left-[-75%] bottom-0 w-full transition-transform duration-300"
                style={{
                  transform: `translateY(${hookPosition}%)`,
                }}
              >
                <Image
                  src={HookBlack}
                  alt="Fishing Hook"
                  width={0}
                  height={0}
                  className="w-64 h-auto object-contain pixel-art"
                  style={{
                    imageRendering: "pixelated",
                  }}
                  priority
                />
              </div>

              {/* Fish */}
              <div
                style={{
                  transform: `translateY(${
                    currentFish === 1 || currentFish === 3 ? "-10px" : "0px"
                  })`,
                }}
              >
                <Image
                  src={
                    currentFish === 0
                      ? fishNormalBubble1
                      : currentFish === 1
                      ? fishNormalBubble2
                      : currentFish === 2
                      ? fishAnnoyedBubble1
                      : fishAnnoyedBubble2
                  }
                  alt="Fish"
                  width={0}
                  height={0}
                  className="w-full h-auto pixel-art"
                  style={{
                    imageRendering: "pixelated",
                  }}
                  priority
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
