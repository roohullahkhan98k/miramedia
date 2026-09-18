"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import WordmarkSplash from "@/components/layout/Splash/WordmarkSplash";

const WORDMARK_REVEAL_DURATION = 1.1;
const WORDMARK_HOLD_DURATION = 1.0;
const WORDMARK_EXIT_DURATION = 1.2;
const SPLASH_EXIT_OVERLAP = 0.5;
const SPLASH_EXIT_TRANSITION = {
  duration: 0.9,
  ease: [0.77, 0, 0.175, 1],
};

const PHASES = {
  reveal: "reveal",
  hideWordmark: "hideWordmark",
};

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(PHASES.reveal);

  useEffect(() => {
    const hideTimer = setTimeout(
      () => {
        setPhase(PHASES.hideWordmark);
      },
      (WORDMARK_REVEAL_DURATION + WORDMARK_HOLD_DURATION) * 1000,
    );

    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (phase !== PHASES.hideWordmark) return undefined;

    const exitTimer = setTimeout(
      () => {
        onComplete?.();
      },
      WORDMARK_EXIT_DURATION * SPLASH_EXIT_OVERLAP * 1000,
    );

    return () => clearTimeout(exitTimer);
  }, [onComplete, phase]);

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{
        clipPath: "inset(100% 0% 0% 0%)",
        transition: SPLASH_EXIT_TRANSITION,
      }}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 flex h-dvh items-center justify-center overflow-hidden bg-primary will-change-[clip-path]"
    >
      <WordmarkSplash
        color="black"
        className="block h-auto w-2/3 md:w-1/3"
        animatePaths
        pathState={phase === PHASES.reveal ? "show" : "exit"}
      />
    </motion.div>
  );
}
