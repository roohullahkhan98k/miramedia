"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import EyeFollower from "@/components/home/HomeAbout/EyeFollower";
import site from "@/data/site.json";

const text = site.about.text;
const highlightWords = site.about.highlightWords;

const HomeAbout = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const reveal = useTransform(scrollYProgress, [0.03, 0.64], [0, 1]);
  const eyeOpacity = useTransform(scrollYProgress, [0.55, 0.64], [0, 1]);

  const [revealProgress, setRevealProgress] = useState(0);
  const [eyeReveal, setEyeReveal] = useState(0);

  useEffect(() => {
    const unsubReveal = reveal.on("change", (v) => setRevealProgress(v));
    const unsubEye = eyeOpacity.on("change", (v) => setEyeReveal(v));
    return () => {
      unsubReveal();
      unsubEye();
    };
  }, [reveal, eyeOpacity]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-[380vh] -mt-[85vh]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
        <div className="max-w-5xl text-center text-2xl leading-[1.05] sm:text-3xl md:text-5xl font-medium text-white md:leading-[1.15]">
          <ScrollRevealText
            text={text}
            highlightWords={highlightWords}
            progress={revealProgress}
          />
        </div>

        <EyeFollower progress={eyeReveal} />
      </div>
    </motion.section>
  );
};

export default HomeAbout;

function ScrollRevealText({ text, highlightWords, progress }) {
  const words = useMemo(() => text.split(" "), [text]);

  const highlightedWordIndexes = useMemo(() => {
    const cleaned = words.map((w) => w.toLowerCase().replace(/[.,]/g, ""));
    const out = new Set();

    for (const phrase of highlightWords) {
      const phraseWords = phrase.toLowerCase().split(/\s+/).filter(Boolean);
      if (phraseWords.length === 0) continue;

      for (let i = 0; i <= cleaned.length - phraseWords.length; i++) {
        let match = true;
        for (let j = 0; j < phraseWords.length; j++) {
          if (cleaned[i + j] !== phraseWords[j]) {
            match = false;
            break;
          }
        }
        if (match) {
          for (let k = 0; k < phraseWords.length; k++) out.add(i + k);
        }
      }
    }

    return out;
  }, [words, highlightWords]);

  const totalChars = useMemo(
    () => words.reduce((acc, w) => acc + w.length, 0),
    [words],
  );

  let globalCharIndex = 0;

  return (
    <span>
      {words.map((word, wordIndex) => {
        const isHighlighted = highlightedWordIndexes.has(wordIndex);

        return (
          <span
            key={wordIndex}
            className="inline-block mr-1.5 md:mr-3 align-top"
          >
            {word.split("").map((char, charIndex) => {
              const idx = globalCharIndex++;

              const window = 0.085;
              const start =
                totalChars <= 1 ? 0 : (idx / (totalChars - 1)) * (1 - window);
              const local = clamp01((progress - start) / window);

              const eased = smootherstep(local);
              const y = (1 - eased) * 22;

              return (
                <span
                  key={charIndex}
                  className={`inline-block will-change-transform ${
                    isHighlighted ? "text-primary-light" : ""
                  }`}
                  style={{
                    opacity: eased,
                    transform: `translate3d(0, ${y}px, 0)`,
                    clipPath: `inset(0 0 ${(1 - eased) * 100}% 0)`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function smootherstep(t) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}
