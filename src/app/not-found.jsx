"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useSplash } from "@/components/layout/Splash/SplashContext";

const LETTER_HEIGHT = 205;
const STEP = LETTER_HEIGHT + 80;
const LIME = "#f4f7fb";
const GRID_COLOR = "#1c1c1c";
const LETTER_EASE = [0.83, 0, 0.17, 1];

const paths = [
  "M45.4689 90.3549V0.291464H80.1536V204.319H45.4689V114.838H0L4.66348 0.291464H39.3481L35.559 90.3549H45.4689Z",
  "M144.45 0C157.857 0 168.933 11.0758 168.933 24.4833V180.127C168.933 193.534 157.857 204.61 144.45 204.61H115.594C102.187 204.61 91.1109 193.534 91.1109 180.127V24.4833C91.1109 11.0758 102.187 0 115.594 0H144.45ZM132.791 180.127C133.957 158.85 135.123 134.075 135.123 102.305C135.123 70.5352 133.957 45.7609 132.791 24.4833H127.253C125.796 45.7604 124.63 70.5352 124.63 102.305C124.63 134.075 125.796 158.85 127.253 180.127H132.791Z",
  "M223.651 90.3549V0.291464H258.336V204.319H223.651V114.838H178.182L182.846 0.291464H217.53L213.741 90.3549H223.651Z",
];

const gridStyles = {
  backgroundImage: `
    linear-gradient(${GRID_COLOR} 1px, transparent 1px),
    linear-gradient(90deg, ${GRID_COLOR} 1px, transparent 1px)
  `,
  backgroundSize: "64px 64px",
};

const vignetteStyles = {
  background: `
    linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 24%, transparent 76%, rgba(0,0,0,0.72)),
    linear-gradient(to right, rgba(0,0,0,0.72), transparent 22%, transparent 78%, rgba(0,0,0,0.72))
  `,
};

export default function NotFound() {
  const { splashDone } = useSplash();

  return (
    <main className="overflow-hidden bg-black px-5 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={gridStyles}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={vignetteStyles}
      />

      <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-6">
        <div className="w-1/2 md:w-1/4 max-w-full overflow-hidden">
          <motion.svg
            viewBox="0 0 259 205"
            className="w-full overflow-visible"
            aria-label="404"
            initial={{ y: "100%" }}
            animate={{
              y: splashDone ? "0%" : "100%",
              filter: [
                "drop-shadow(0 0 10px rgba(244,247,251,0.08))",
                "drop-shadow(0 0 22px rgba(244,247,251,0.16))",
                "drop-shadow(0 0 10px rgba(244,247,251,0.08))",
              ],
            }}
            transition={{
              y: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              filter: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <defs>
              {paths.map((_, index) => (
                <clipPath key={index} id={`not-found-letter-${index}`}>
                  <rect width="259" height="205" />
                </clipPath>
              ))}
            </defs>

            {paths.map((path, index) => (
              <g key={index} clipPath={`url(#not-found-letter-${index})`}>
                <motion.g
                  initial={{ y: STEP }}
                  animate={
                    splashDone ? { y: [0, 0, -STEP, -STEP, 0] } : { y: STEP }
                  }
                  transition={{
                    y: {
                      duration: 4.4,
                      repeat: Infinity,
                      ease: LETTER_EASE,
                      times: [0, 0.32, 0.47, 0.74, 1],
                      delay: 0.65 + index * 0.08,
                    },
                  }}
                >
                  <path d={path} fill={LIME} />
                  <path
                    d={path}
                    fill={LIME}
                    transform={`translate(0 ${STEP})`}
                  />
                </motion.g>
              </g>
            ))}
          </motion.svg>
        </div>
      </section>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center text-sm sm:bottom-12 sm:text-base md:text-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <p>
          This page wandered off the grid{" - "}
          <Link href="/" className="text-primary-light">
            Return to Home
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
