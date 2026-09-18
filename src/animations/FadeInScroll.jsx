"use client";

import { motion, useInView } from "motion/react";
import React, { useRef } from "react";

export default function FadeInScroll({
  children,
  className = "",
  initialY = 40,
  amount = 0.2,
  ease = [0.22, 1, 0.36, 1],
  duration = 0.7,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
