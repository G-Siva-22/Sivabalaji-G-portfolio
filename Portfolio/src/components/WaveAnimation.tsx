import { useEffect, useRef } from "react";

interface WaveAnimationProps {
  position?: "top" | "bottom";
  className?: string;
}

const WaveAnimation = ({ position = "top", className = "" }: WaveAnimationProps) => {
  const waveRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={waveRef}
      className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full overflow-hidden ${className}`}
      style={{ height: "150px" }}
    >
      {/* Wave Layer 1 */}
      <div className="absolute inset-0 flex">
        <svg
          className="animate-wave"
          style={{ width: "200%", height: "100%" }}
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C300,100 600,0 900,50 C1200,100 1500,0 1800,50 L1800,150 L0,150 Z"
            className="fill-primary/20"
          />
        </svg>
      </div>

      {/* Wave Layer 2 */}
      <div className="absolute inset-0 flex">
        <svg
          className="animate-wave"
          style={{ 
            width: "200%", 
            height: "100%",
            animationDelay: "-2s",
            animationDuration: "25s"
          }}
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,30 600,120 900,70 C1200,20 1500,110 1800,60 L1800,150 L0,150 Z"
            className="fill-primary/15"
          />
        </svg>
      </div>

      {/* Wave Layer 3 */}
      <div className="absolute inset-0 flex">
        <svg
          className="animate-wave"
          style={{ 
            width: "200%", 
            height: "100%",
            animationDelay: "-4s",
            animationDuration: "30s"
          }}
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C300,80 600,20 900,60 C1200,100 1500,30 1800,70 L1800,150 L0,150 Z"
            className="fill-primary/10"
          />
        </svg>
      </div>
    </div>
  );
};

export default WaveAnimation;
