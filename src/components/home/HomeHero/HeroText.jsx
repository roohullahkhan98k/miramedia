"use client";

import React from "react";
import { motion } from "motion/react";
import { useSplash } from "@/components/layout/Splash/SplashContext";
import site from "@/data/site.json";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroText({ className }) {
  const { splashDone } = useSplash();
  const words = site.brand.toUpperCase().split(" ");

  return (
    <div className={className}>
      <motion.h1
        className="w-full font-clash font-semibold uppercase tracking-[-0.04em] text-white"
        variants={container}
        initial="hidden"
        animate={splashDone ? "show" : "hidden"}
      >
        {words.map((word) => (
          <span key={word} className="block overflow-hidden leading-[0.9]">
            <motion.span
              className="block text-[clamp(3.25rem,12vw,9.5rem)]"
              variants={wordVariant}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
