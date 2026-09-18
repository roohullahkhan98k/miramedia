"use client";

import React from "react";
import { motion } from "motion/react";
import site from "@/data/site.json";

const WordmarkSplash = ({
  color = "white",
  className = "",
  animatePaths = false,
  pathState = "show",
}) => {
  const words = site.brand.split(" ");

  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      initial={animatePaths ? "hidden" : false}
      animate={animatePaths ? pathState : false}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
        exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
      }}
    >
      {words.map((word) => (
        <motion.span
          key={word}
          className="font-clash text-[12vw] font-semibold uppercase leading-[0.85] tracking-[-0.04em] md:text-[6vw]"
          style={{ color }}
          variants={{
            hidden: { clipPath: "inset(0% 0% 100% 0%)", y: "-14%", opacity: 0 },
            show: {
              clipPath: "inset(0% 0% 0% 0%)",
              y: "0%",
              opacity: 1,
              transition: { duration: 0.68, ease: [0.77, 0, 0.175, 1] },
            },
            exit: {
              clipPath: "inset(100% 0% 0% 0%)",
              y: "14%",
              opacity: 0,
              transition: { duration: 0.68, ease: [0.77, 0, 0.175, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordmarkSplash;
