"use client";

import { motion } from "motion/react";

export default function FadeIn({
  initialOpacity = 0,
  initialY = 20,
  animateOpacity = 1,
  animateY = 0,
  duration = 0.6,
  delay = 0,
  children,
  className,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: initialOpacity, y: initialY }}
      animate={{ opacity: animateOpacity, y: animateY }}
      transition={{ duration: duration, delay: delay }}
    >
      {children}
    </motion.div>
  );
}
