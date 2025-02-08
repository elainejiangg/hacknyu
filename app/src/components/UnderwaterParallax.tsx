import React from "react";
import { Parallax } from "react-scroll-parallax";

const UnderwaterParallax: React.FC = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <Parallax
        className="parallax-background"
        y={[-20, 20]}
        style={{
          background: "linear-gradient(180deg, #0077be 0%, #001a4d 100%)",
          backgroundSize: "cover",
        }}
      >
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-blue-900/50 to-black">
          <div className="relative z-10">
            <h1 className="text-4xl font-pixel text-white">
              Welcome to the Underwater World
            </h1>
            <p className="absolute bottom-[-200px] left-1/2 transform -translate-x-1/2 text-4xl animate-bounce text-white">
              ↓
            </p>
          </div>
        </div>
        <div className="vector-waves absolute top-[30vh] left-[-20%] w-[140%] z-20">
          <Parallax
            speed={20}
            translateX={["0%", "-100%"]}
            className="wave-container"
          >
            <svg
              className="wave-1"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(0,119,190,0.3)"
                d="M0,192 C480,192 480,100 960,100 C1440,100 1440,192 1920,192 C2400,192 2400,100 2880,100 C3360,100 3360,192 3840,192 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </Parallax>
          <Parallax
            speed={30}
            translateX={["0%", "100%"]}
            className="wave-container"
          >
            <svg
              className="wave-2"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(0,26,77,0.4)"
                d="M0,100 C480,100 480,192 960,192 C1440,192 1440,100 1920,100 C2400,100 2400,192 2880,192 C3360,192 3360,100 3840,100 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </Parallax>
          <Parallax
            speed={40}
            translateX={["0%", "-100%"]}
            className="wave-container"
          >
            <svg
              className="wave-1"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(0,119,190,0.3)"
                d="M0,192 C480,192 480,100 960,100 C1440,100 1440,192 1920,192 C2400,192 2400,100 2880,100 C3360,100 3360,192 3840,192 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </Parallax>
          <Parallax
            speed={50}
            translateX={["0%", "100%"]}
            className="wave-container"
          >
            <svg
              className="wave-2"
              viewBox="0 0 4320 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(0,26,77,0.4)"
                d="M0,100 C480,100 480,192 960,192 C1440,192 1440,100 1920,100 C2400,100 2400,192 2880,192 C3360,192 3360,100 3840,100 L3840,320 L0,320 Z"
              ></path>
            </svg>
          </Parallax>
        </div>
      </Parallax>
    </div>
  );
};

export default UnderwaterParallax;
