"use client";
import { motion, useInView } from "motion/react";
import React, { useRef, Children } from "react";

const ClipInView = ({ children, className = "", ...rest }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const childVariant = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    show: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 18,
        opacity: { duration: 0.7 },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
      {...rest}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariant} style={{ willChange: "clip-path" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ClipInView;
