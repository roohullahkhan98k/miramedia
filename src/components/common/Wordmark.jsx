"use client";

import React from "react";
import { motion } from "motion/react";
import site from "@/data/site.json";

const Wordmark = ({
  color = "white",
  className = "",
  animated = false,
  isInView = true,
}) => {
  const Comp = animated ? motion.div : "div";

  return (
    <Comp
      className={`font-krisha uppercase tracking-tight leading-none text-[clamp(2.5rem,8vw,5.5rem)] ${className}`}
      style={{ color }}
      {...(animated
        ? {
            initial: { clipPath: "inset(100% 0% 0% 0%)", y: "14%", opacity: 0 },
            animate: isInView
              ? { clipPath: "inset(0% 0% 0% 0%)", y: "0%", opacity: 1 }
              : { clipPath: "inset(100% 0% 0% 0%)", y: "14%", opacity: 0 },
            transition: { duration: 0.78, ease: [0.77, 0, 0.175, 1] },
          }
        : {})}
    >
      {site.brand}
    </Comp>
  );
};

export default Wordmark;
