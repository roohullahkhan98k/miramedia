"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import site from "@/data/site.json";

const STATS = site.stats;

const StatCard = ({ label, label2, value, index, containerProgress }) => {
  const isLongText = value?.length > 4;

  const startX = -(index * 4);
  const endX = index * 22 + index * 4;

  const xRaw = useTransform(containerProgress, [0, 1], [startX, endX]);

  const xSpring = useSpring(xRaw, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const x = useTransform(xSpring, (val) => `${val}%`);
  const spacerWidth = useTransform(xSpring, (val) => val * 8);

  return (
    <div className="relative px-8 md:px-16 py-10 md:py-14 flex flex-row items-center justify-between border-t border-white/30 overflow-hidden gap-8 w-full bg-linear-to-b from-black/65 to-black/20">
      <motion.div
        style={{ x }}
        className="flex flex-row items-center gap-8 md:gap-12 shrink-0 z-10"
      >
        {value && (
          <span
            className={`leading-none shrink-0 font-bold tracking-tight text-primary ${
              isLongText ? "text-4xl md:text-6xl" : "text-7xl md:text-[130px]"
            }`}
          >
            {value}
          </span>
        )}

        <p className="text-base md:text-lg leading-tight uppercase font-medium max-w-40 shrink-0">
          {label}
        </p>
      </motion.div>

      <div className="absolute inset-x-0 mx-8 md:mx-16 flex items-center pointer-events-none hidden sm:flex">
        <motion.div style={{ width: spacerWidth }} className="shrink-0" />
        <div
          className="flex-1 h-px ml-64 md:ml-[420px] mr-64 md:mr-[300px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-primary) 0 8px, transparent 8px 16px)",
            opacity: 0.35,
          }}
        />
      </div>

      <div className="shrink-0 max-w-56 text-right z-10">
        {label2 && (
          <p className="text-base md:text-lg leading-snug text-primary-light">
            {label2}
          </p>
        )}
      </div>
    </div>
  );
};

export default function HomeStats() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="w-full flex flex-col pt-14">
      {STATS.map((stat, index) => (
        <StatCard
          key={index}
          index={index}
          containerProgress={scrollYProgress}
          {...stat}
        />
      ))}

      <div className="h-20 bg-linear-to-b from-black/20 to-transparent" />
    </section>
  );
}
