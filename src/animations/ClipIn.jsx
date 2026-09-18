"use client";
import { motion } from "motion/react";
import React, { Children } from "react";

const ClipIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  ...rest
}) => {
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
        opacity: { duration },
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
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

export default ClipIn;
