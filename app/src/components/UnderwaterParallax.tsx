import React, { useEffect, useState } from "react";

const UnderwaterParallax: React.FC = () => {
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX !== 0) return;

      setScrollValue((prev) => {
        const newValue = prev + e.deltaY * 0.1;
        return Math.max(0, Math.min(newValue, 4180));
      });
    };

    const element = document.querySelector(".scroll-container");
    if (element) {
      const options = { passive: false };
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
        rgb(0, 77, 122) ${20 - transitionProgress * 20}%,
        rgb(0, 36, 56) ${60 - transitionProgress * 60}%, 
        #000000 ${100 - transitionProgress * 100}%)`,
    };
  };

  return (
    <div className="h-screen w-screen overflow-hidden fixed inset-0 scroll-container">
      <div
        className="h-full w-full overflow-hidden"
        style={getBackgroundStyle()}
      >
        <div className="vector-waves absolute top-[30vh] left-[-20%] w-[140%] z-0 overflow-hidden">
          <div
            className="wave-container overflow-hidden"
            style={{ transform: getTransform("left", 1.5) }}
          >
            <svg
              className="wave-1"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(48, 169, 239, 0.3)"
                d="M0,192 C480,192 480,100 960,100 C1440,100 1440,192 1920,192 C2400,192 2400,100 2880,100 C3360,100 3360,192 3840,192 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </div>
          <div
            className="wave-container overflow-hidden"
            style={{ transform: getTransform("right", 1.2) }}
          >
            <svg
              className="wave-2"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(42, 145, 205, 0.3)"
                d="M0,100 C480,100 480,192 960,192 C1440,192 1440,100 1920,100 C2400,100 2400,192 2880,192 C3360,192 3360,100 3840,100 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </div>
          <div
            className="wave-container overflow-hidden"
            style={{ transform: getTransform("left", 2) }}
          >
            <svg
              className="wave-1"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(3, 125, 196, 0.3)"
                d="M0,192 C480,192 480,100 960,100 C1440,100 1440,192 1920,192 C2400,192 2400,100 2880,100 C3360,100 3360,192 3840,192 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </div>
          <div
            className="wave-container overflow-hidden"
            style={{ transform: getTransform("right", 1.8) }}
          >
            <svg
              className="wave-2"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(0, 119, 190, 0.3)"
                d="M0,192 C480,192 480,100 960,100 C1440,100 1440,192 1920,192 C2400,192 2400,100 2880,100 C3360,100 3360,192 3840,192 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <div style={{ transform: textTransform }}>
            <h1 className="text-4xl font-pixel text-white">
              Welcome to the Underwater World
            </h1>
            <div className="flex justify-center mt-10">
              <p className="text-4xl animate-bounce text-white">↓</p>
            </div>
          </div>

          <div
            className="absolute top-[120%] text-center"
            style={{ transform: textTransform }}
          >
            <p className="text-white text-4xl">𓆟</p>
            <h2 className="text-4xl font-pixel text-white">You are a Fish</h2>
            <p className="mt-4 text-2xl font-pixel text-blue-200">
              Swimming in the deep blue sea
            </p>
          </div>

          <div
            className="absolute top-[450vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <div className="flex flex-col gap-4">
              <p className="text-2xl text-blue-200 leading-relaxed mx-10">
                in these dark waters,
                <br />
                phishers lurk with their treacherous lures
              </p>
            </div>
          </div>

          <div
            className="absolute top-[550vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <p className="text-2xl text-blue-200 leading-relaxed mx-10">
              Learn to spot their tricks, <br />
              or risk being hooked and caught into their nets...
            </p>
          </div>

          <div
            className="absolute top-[650vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-4xl font-pixel text-red-400 font-bold mb-12 mx-10">
              and BEING SOME PHISHER'S DINNER
            </h2>
            <p className="text-white text-4xl">𓆟</p>
          </div>

          <div
            className="absolute top-[850vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              You will encounter suspicious websites, <br /> crafty emails, and
              misleading text messages.
            </h2>
          </div>

          <div
            className="absolute top-[950vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              Find and uncover/click on the red flags: suspicious links, <br />{" "}
              odd wording, unfamiliar contacts, etc.
            </h2>
          </div>

          <div
            className="absolute top-[1050vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              But be careful! <br /> You are limited to only a number of clicks
              <br /> -- the number of red flags there are in an example.
            </h2>
          </div>

          <div
            className="absolute top-[1150vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel"
            style={{ transform: getVerticalTransform(1) }}
          >
            <h2 className="text-2xl font-pixel text-white mx-10">
              Only click what seems suspicious. <br /> Click wrongly, and you'll
              take damage...
            </h2>
          </div>

          <div
            className="absolute top-[1250vh] w-screen h-screen flex flex-col items-center justify-center text-center font-pixel z-[9999] pointer-events-auto"
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
                  hover:border-blue-300 hover:scale-105 hover:bg-white hover:text-blue-900
                  transition-all duration-300 ease-in-out
                  pointer-events-auto cursor-pointer
                  z-[9999] relative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Button clicked!");
                }}
              >
                PLAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwaterParallax;
