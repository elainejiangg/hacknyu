import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BigWave from "@/app/assets/Big_Wave.png";
import SmallWave from "@/app/assets/Small_Wave.png";
import Fish from "@/app/assets/Fish_Normal_Bubble1.png";

declare global {
  interface ElementEventMap {
    wheel: WheelEvent;
  }
}

const UnderwaterParallax: React.FC = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX !== 0) return;

      setScrollValue((prev) => {
        const newValue = prev + e.deltaY * 0.1;
        return Math.max(0, Math.min(newValue, 3180));
      });
    };

    const element = document.querySelector(".scroll-container");
    if (element) {
      const options: AddEventListenerOptions = { passive: false };
      element.addEventListener("wheel", handleWheel as EventListener, options);

      return () => {
        element.removeEventListener(
          "wheel",
          handleWheel as EventListener,
          options
        );
      };
    }
  }, []);

  const getTransform = (direction: "left" | "right", speed: number = 1) => {
    const baseMove = scrollValue * speed * 0.1;
    return `translateX(${direction === "left" ? -baseMove : baseMove}%)`;
  };

  const getVerticalTransform = (speed: number = 1) => {
    const baseMove = scrollValue * speed * 0.1;
    return `translateY(-${baseMove * 3}%)`; // Multiplied by 3 to ensure it moves out of view
  };

  const textTransform = getVerticalTransform(4); // Increased speed for text

  const getBackgroundStyle = () => {
    const transitionProgress = Math.min(scrollValue / 500, 1);
    return {
      background: `linear-gradient(to bottom,
        rgb(255, 255, 255) ${10 - transitionProgress * 10}%,
        rgb(180, 180, 180) ${40 - transitionProgress * 40}%,
        rgb(100, 100, 100) ${70 - transitionProgress * 70}%,
        #000000 ${100 - transitionProgress * 100}%)`,
    };
  };

  const getFishTransform = () => {
    // Calculate fish position based on scroll progress (0 to 2000)
    const progress = (scrollValue / 2000) * 120;
    return `translateX(${100 - progress}%)`;
  };

  const getSecondFishTransform = () => {
    // Slightly different speed for the second fish
    const progress = (scrollValue / 2000) * 150; // Different multiplier for varied speed
    return `translateX(${150 - progress}%)`;
  };

  const getTopFishTransform = () => {
    // Moving right instead of left
    const progress = (scrollValue / 2000) * 70;
    return `translateX(${-100 + progress}%) scaleX(-1)`; // Start at -30% (off-screen left)
  };

  const getBottomWavesOpacity = () => {
    // Start fade in earlier (around -50 scroll value) and complete by 100
    const fadeStart = 0; // Changed to negative value to start before scroll
    const fadeEnd = 100; // Changed from 200 to 100
    const opacity = Math.max(
      0,
      Math.min(1, (scrollValue - fadeStart) / (fadeEnd - fadeStart))
    );
    return opacity;
  };

  return (
    <div className="h-screen w-screen overflow-hidden fixed inset-0 scroll-container">
      <div
        className="h-full w-full overflow-hidden"
        style={getBackgroundStyle()}
      >
        {/* Top fish moving right */}
        {/* <div
          className="absolute top-[15vh] w-full z-10 animate-swim-medium"
          style={{
            transform: getTopFishTransform(),
          }}
        >
          <img
            src={Fish.src}
            alt="Swimming Fish"
            className="w-20 h-20 object-contain opacity-40"
          />
        </div> */}

        {/* First bottom fish */}
        <div
          className="absolute bottom-[7vh] w-full z-10 animate-swim"
          style={{
            transform: getFishTransform(),
          }}
        >
          <img
            src={Fish.src}
            alt="Swimming Fish"
            className="w-20 h-20 object-contain opacity-50" // Added opacity
          />
        </div>

        {/* Second fish */}
        <div
          className="absolute bottom-[2vh] w-full z-10 animate-swim-slow" // Different animation and position
          style={{
            transform: getSecondFishTransform(),
          }}
        >
          <img
            src={Fish.src}
            alt="Swimming Fish"
            className="w-20 h-20 object-contain opacity-30" // Lower opacity
          />
        </div>

        <div className="vector-waves absolute top-[20vh] left-[-20%] w-[140%] z-0">
          {/* First layer - fastest moving */}
          <div
            className="wave-container"
            style={{ transform: getTransform("left", 2.5) }}
          >
            <div className="flex">
              {[...Array(20)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-20 object-contain opacity-20"
                />
              ))}
            </div>
          </div>
          <div
            className="wave-container"
            style={{ transform: getTransform("right", 2.2) }}
          >
            {/* <div className="flex">
              {[...Array(30)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-16 object-contain opacity-15"
                />
              ))}
            </div> */}
          </div>

          {/* Second layer - medium speed */}
          <div
            className="wave-container"
            style={{ transform: getTransform("left", 1.5) }}
          >
            <div className="flex">
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src={BigWave.src}
                  alt="Big Wave"
                  className="w-[20%] h-24 object-contain opacity-30"
                />
              ))}
            </div>
          </div>
          <div
            className="wave-container"
            style={{ transform: getTransform("right", 0.3) }}
          >
            <div className="flex">
              {[...Array(15)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-20 object-contain opacity-30"
                />
              ))}
            </div>
          </div>

          {/* Third layer - slowest moving */}
          <div
            className="wave-container"
            style={{ transform: getTransform("left", 1) }}
          >
            <div className="flex">
              {[...Array(25)].map((_, i) => (
                <img
                  key={i}
                  src={BigWave.src}
                  alt="Big Wave"
                  className="w-[20%] h-28 object-contain opacity-30"
                />
              ))}
            </div>
          </div>
          <div
            className="wave-container"
            style={{ transform: getTransform("right", 0.8) }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-24 object-contain opacity-30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom waves layer */}
        <div
          className="absolute bottom-0 left-[-20%] w-[140%] z-20 transition-opacity duration-300"
          style={{ opacity: getBottomWavesOpacity() }}
        >
          {/* First bottom wave */}
          <div
            className="wave-container"
            style={{ transform: getTransform("left", 0.8) }}
          >
            <div className="flex">
              {[...Array(100)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-16 object-contain opacity-30 rotate-180 brightness-0 invert"
                />
              ))}
            </div>
          </div>

          {/* Second bottom wave */}
          <div
            className="wave-container absolute bottom-[3vh] left-[-1000%]"
            style={{ transform: getTransform("right", 0.3) }}
          >
            <div className="flex">
              {[...Array(100)].map((_, i) => (
                <img
                  key={i}
                  src={SmallWave.src}
                  alt="Small Wave"
                  className="w-[20%] h-16 object-contain opacity-20 rotate-180 brightness-0 invert"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <div style={{ transform: textTransform }}>
            <h1 className="text-5xl font-pixel text-white">
              Welcome to the Underwater World.
            </h1>
            <div className="flex justify-center mt-10">
              <p className="text-4xl animate-bounce text-white">↓</p>
            </div>
          </div>

          <div
            className="absolute top-[150vh] text-center"
            style={{ transform: textTransform }}
          >
            <p className="text-white text-4xl">𓆟</p>
            <h2 className="text-4xl font-pixel text-white">You are a Fish</h2>
            <p className="mt-4 text-2xl font-pixel text-blue-200">
              Swimming in the deep blue sea...
            </p>
          </div>

          <div
            className="absolute top-[250vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <div className="flex flex-col gap-4">
              <p className="text-2xl text-blue-200 leading-relaxed mx-10">
                In these dark waters,
                <br />
                phishers lurk with their treacherous lures...
              </p>
            </div>
          </div>

          <div
            className="absolute top-[350vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <p className="text-2xl text-blue-200 leading-relaxed mx-10">
              Learn to spot their tricks, <br />
              or risk being hooked and caught into their nets...
            </p>
          </div>

          <div
            className="absolute top-[450vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-4xl font-pixel text-red-400 font-bold mb-12 mx-10">
              and BEING SOME PHISHER'S DINNER!
            </h2>
            {/* <p className="text-white text-4xl">𓆟</p> */}
          </div>

          <div
            className="absolute top-[550vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              You will encounter suspicious websites, <br /> crafty emails, and
              misleading text messages.
            </h2>
          </div>

          <div
            className="absolute top-[650vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              Find and uncover/click on the red flags: suspicious links, <br />{" "}
              odd wording, unfamiliar contacts, etc.
            </h2>
          </div>

          <div
            className="absolute top-[750vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              But be careful! <br /> You are limited to only a certain number of
              clicks
              <br />
              —the number of red flags there are in the example.
            </h2>
          </div>

          <div
            className="absolute top-[850vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              Only click what seems suspicious. <br /> Click wrongly, and your
              fish will
              <br />
              be one step closer to being fished...
            </h2>
          </div>

          <div
            className="absolute top-[950vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel z-[9999] pointer-events-auto"
            style={{ transform: getVerticalTransform(1) }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-[9999] pointer-events-auto">
              <h2 className="text-2xl font-pixel text-white mx-10 mb-5 pointer-events-auto">
                Ready to swim?
              </h2>

              <button
                className="font-pixel text-3xl text-white
                  border-2 border-white px-10 py-3
                  hover:border-white-300 hover:scale-105 hover:bg-white/10
                  transition-all duration-300 ease-in-out
                  pointer-events-auto cursor-pointer
                  z-[9999] relative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/dashboard");
                }}
              >
                PLAY
              </button>
            </div>
          </div>
        </div>

        {/* Add skip button */}
        <button
          className="fixed bottom-4 right-4 text-white/30 text-sm font-pixel
            hover:text-white/60 transition-colors duration-300 z-[9999]
            pointer-events-auto cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push("/dashboard");
          }}
        >
          skip →
        </button>
      </div>
    </div>
  );
};

export default UnderwaterParallax;
