"use client";

import Wordmark from "@/components/common/Wordmark";
import { motion } from "motion/react";

const LETTER_HEIGHT = 281;
const STEP = LETTER_HEIGHT + 80;

const GRID_SIZE = 64;
const LIME = "#f4f7fb";
const GRID_COLOR = "#1c1c1c";

const EASE = [0.22, 1, 0.36, 1];
const LETTER_EASE = [0.83, 0, 0.17, 1];

const gridStyles = {
  backgroundImage: `
    linear-gradient(${GRID_COLOR} 1px, transparent 1px),
    linear-gradient(90deg, ${GRID_COLOR} 1px, transparent 1px)
  `,
  backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
};

const vignetteStyles = {
  background: `
    linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 24%, transparent 76%, rgba(0,0,0,0.72)),
    linear-gradient(to right, rgba(0,0,0,0.72), transparent 22%, transparent 78%, rgba(0,0,0,0.72))
  `,
};

const paths = [
  "M73.2 0C91.6 0 106.8 15.2 106.8 33.6V247.2C106.8 265.6 91.6 280.8 73.2 280.8H33.6C15.2 280.8 0 265.6 0 247.2V33.6C0 15.2 15.2 0 33.6 0H73.2ZM57.2 247.2C58.8 218 60.4 184 60.4 140.4C60.4 96.8 58.8 62.8 57.2 33.6H49.6C47.6 62.8 46 96.8 46 140.4C46 184 47.6 218 49.6 247.2H57.2Z",
  "M192.294 0.399995V34H169.494V123.6H188.294V157.2H169.494V280.4H121.894V0.399995H192.294Z",
  "M272.763 0.399995V34H249.963V123.6H268.763V157.2H249.963V280.4H202.363V0.399995H272.763Z",
  "M282.831 280.4V0.399995H330.031V246.8H343.231V280.4H282.831Z",
  "M401.125 0.399995V280.4H353.925V0.399995H401.125Z",
  "M477.206 0.399995C483.206 69.2 494.406 132.8 500.806 174.4H507.206C502.806 130.4 494.806 66.8 490.406 0.399995H539.206V280.4H479.206C473.606 211.6 462.406 148 455.606 106.4H449.206C454.006 150.4 461.606 214 466.006 280.4H417.206V0.399995H477.206Z",
  "M555.097 280.4V0.399995H625.497V34H602.697V123.6H621.497V157.2H602.697V246.8H625.497V280.4H555.097Z",
];

export default function MaintenanceScreen() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
      className="relative h-dvh overflow-hidden bg-black px-5 text-white"
    >
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

      <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2 sm:top-14">
        <Wordmark color="white" className="h-4 sm:h-5" />
      </div>

      <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center">
        <motion.svg
          viewBox="0 0 626 281"
          className="w-[82vw] max-w-4xl overflow-visible sm:w-[78vw]"
          aria-label="Offline"
          animate={{
            filter: [
              "drop-shadow(0 0 10px rgba(244,247,251,0.08))",
              "drop-shadow(0 0 22px rgba(244,247,251,0.16))",
              "drop-shadow(0 0 10px rgba(244,247,251,0.08))",
            ],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            {paths.map((_, i) => (
              <clipPath key={i} id={`letter-clip-${i}`}>
                <rect width="626" height="281" />
              </clipPath>
            ))}
          </defs>

          {paths.map((d, i) => (
            <g key={i} clipPath={`url(#letter-clip-${i})`}>
              <motion.g
                initial={{ y: STEP }}
                animate={{ y: [0, 0, -STEP, -STEP, 0] }}
                transition={{
                  y: {
                    duration: 4.4,
                    repeat: Infinity,
                    ease: LETTER_EASE,
                    times: [0, 0.32, 0.47, 0.74, 1],
                    delay: 0.65 + i * 0.048,
                  },
                }}
              >
                <path d={d} fill={LIME} />
                <path d={d} fill={LIME} transform={`translate(0 ${STEP})`} />
              </motion.g>
            </g>
          ))}
        </motion.svg>
      </section>

      <p className="absolute bottom-10 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center text-sm sm:bottom-12 sm:text-base md:text-lg">
        Refining the experience.
        <span className="text-primary-light"> See you soon.</span>
      </p>
    </motion.main>
  );
}
