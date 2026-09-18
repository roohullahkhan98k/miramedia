"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  tone = "ice",
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const cardLength = content.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors =
    tone === "warm"
      ? ["#0c0a09", "#050505", "#171412"]
      : ["#05070c", "#000000", "#0a1628"];

  const linearGradients =
    tone === "warm"
      ? [
          "linear-gradient(to bottom right, #3d3429, #1a1510)",
          "linear-gradient(to bottom right, #2a2420, #0a0a0a)",
          "linear-gradient(to bottom right, #4a3f35, #14110e)",
        ]
      : [
          "linear-gradient(to bottom right, #1a3a4a, #0a1628)",
          "linear-gradient(to bottom right, #7eb8d4, #1a2a35)",
          "linear-gradient(to bottom right, #c8d0db, #0a1628)",
          "linear-gradient(to bottom right, #2a4a5a, #05070c)",
        ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, tone]);

  const active = content[activeCard] ?? content[0];
  const trackMinHeight = `${Math.max(cardLength, 2) * 75}vh`;

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ minHeight: trackMinHeight }}
    >
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className="sticky top-24 flex min-h-[22rem] items-center justify-center gap-10 overflow-hidden rounded-2xl border border-white/10 p-6 md:top-28 md:min-h-[26rem] md:p-10"
      >
        <div className="relative w-full max-w-2xl px-2 md:px-4">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/35">
            {String(activeCard + 1).padStart(2, "0")} /{" "}
            {String(cardLength).padStart(2, "0")}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.title ?? activeCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-krisha text-2xl uppercase text-slate-100 md:text-4xl">
                {active?.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
                {active?.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2">
            {content.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i === activeCard ? "bg-[#7eb8d4]" : "bg-white/15",
                )}
              />
            ))}
          </div>
        </div>

        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "hidden h-60 w-80 shrink-0 overflow-hidden rounded-xl lg:block",
            contentClassName,
          )}
        >
          {active?.content ?? null}
        </div>
      </motion.div>
    </div>
  );
};
