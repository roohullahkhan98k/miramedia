import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import DoubleTextHover from "@/components/common/DoubleTextHover";
import Link from "next/link";

export default function EyeFollower({ progress }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getPupilStyle = (eyeRef) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeY, mousePos.x - eyeX);
    const distance = Math.min(
      rect.width / 5,
      Math.hypot(mousePos.y - eyeY, mousePos.x - eyeX) / 12,
    );

    return {
      transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
    };
  };

  const renderEye = (eyeRef, isLeft) => (
    <div
      ref={eyeRef}
      className={`relative w-24 h-14 md:w-32 md:h-16 bg-white overflow-hidden flex items-center justify-center border-4 border-black group-hover:scale-110 transition-transform duration-500 ${isLeft ? "rotate-2" : "-rotate-2"}`}
      style={{
        borderRadius: "4px 4px 50% 50% / 4px 4px 30px 30px",
        animation: "eye-blink 4s ease-in-out infinite",
      }}
    >
      {/* Iris */}
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full transition-transform duration-100 ease-out flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, var(--color-primary), var(--color-primary-light))",
          ...getPupilStyle(eyeRef),
        }}
      >
        {/* Pupil */}
        <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded-full flex items-center justify-center">
          {/* Shine */}
          <div className="w-1.5 h-1.5 bg-white rounded-full -translate-x-0.5 -translate-y-0.5 opacity-80" />
        </div>
      </div>
    </div>
  );

  return (
    <Link href="/contact" className="mt-16 -mb-20 cursor-none">
      <motion.div
        style={{
          opacity: progress,
          pointerEvents: progress > 0.5 ? "auto" : "none",
        }}
        className="flex flex-col items-center group "
      >
        <div className="flex gap-2 md:gap-3">
          {renderEye(leftEyeRef, true)}
          {renderEye(rightEyeRef, false)}
        </div>

        <div className="mt-5">
          <DoubleTextHover
            text1="Don't just stare"
            text2="Let's talk"
            className="font-medium text-center text-sm tracking-widest uppercase"
            text1ClassName="text-white/60"
            text2ClassName="text-white"
          />
        </div>

        <style jsx global>{`
          @keyframes eye-blink {
            0%,
            90%,
            100% {
              clip-path: inset(
                0 0 0% 0 round 4px 4px 50% 50% / 4px 4px 30px 30px
              );
            }
            94% {
              clip-path: inset(
                0 0 100% 0 round 4px 4px 50% 50% / 4px 4px 30px 30px
              );
            }
            98% {
              clip-path: inset(
                0 0 0% 0 round 4px 4px 50% 50% / 4px 4px 30px 30px
              );
            }
          }
        `}</style>
      </motion.div>
    </Link>
  );
}
