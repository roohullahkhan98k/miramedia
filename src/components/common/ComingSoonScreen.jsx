"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useSplash } from "@/components/layout/Splash/SplashContext";

const LETTER_HEIGHT = 205;
const STEP = LETTER_HEIGHT + 80;

const GRID_SIZE = 64;
const LIME = "#f4f7fb";
const GRID_COLOR = "#1c1c1c";

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
  "M41.6799 24.4833H36.142C34.6846 45.7604 33.5188 70.5352 33.5188 102.305C33.5188 134.075 34.6846 158.85 36.142 180.127H41.6799C42.8457 160.016 43.7201 136.698 44.0116 106.969H77.8218V180.127C77.8218 193.534 66.7461 204.61 53.3386 204.61H24.4833C11.0758 204.61 0 193.534 0 180.127V24.4833C0 11.0758 11.0758 0 24.4833 0H53.3386C66.7461 0 77.8218 11.0758 77.8218 24.4833V97.3502H44.0116C43.7201 67.9119 42.8457 44.5945 41.6799 24.4833Z",
  "M141.576 0C154.983 0 166.059 11.0758 166.059 24.4833V180.127C166.059 193.534 154.983 204.61 141.576 204.61H112.721C99.313 204.61 88.2373 193.534 88.2373 180.127V24.4833C88.2373 11.0758 99.313 0 112.721 0H141.576ZM129.917 180.127C131.083 158.85 132.249 134.075 132.249 102.305C132.249 70.5352 131.083 45.7604 129.917 24.4833H124.379C122.922 45.7604 121.756 70.5352 121.756 102.305C121.756 134.075 122.922 158.85 124.379 180.127H129.917Z",
  "M263.04 204.319C264.498 155.061 270.619 109.009 275.282 77.5304H270.619C264.498 108.717 255.754 155.352 253.422 204.319H220.195C217.863 155.352 209.119 108.717 202.998 77.5304H198.335C202.998 109.009 209.119 155.061 210.576 204.319H175.892V0.291464H222.235C225.15 28.5638 229.522 67.0375 234.477 121.833H239.14C244.095 67.0375 248.467 28.5638 251.382 0.291464H297.725V204.319H263.04Z",
  "M344.945 0.291464V204.319H310.552V0.291464H344.945Z",
  "M400.383 0.291464C404.755 50.4239 412.916 96.7672 417.58 127.08H422.243C419.037 95.0184 413.208 48.6751 410.001 0.291464H445.561V204.319H401.84C397.76 154.186 389.599 107.843 384.644 77.5304H379.98C383.478 109.592 389.016 155.935 392.222 204.319H356.663V0.291464H400.383Z",
  "M498.236 24.4833H492.699C491.241 45.7604 490.075 70.5352 490.075 102.305C490.075 134.075 491.241 158.85 492.699 180.127H498.236C499.402 161.765 500.277 140.487 500.568 114.547H494.739V90.0635H534.378V180.127C534.378 193.534 523.303 204.61 509.895 204.61H481.04C467.632 204.61 456.557 193.534 456.557 180.127V24.4833C456.557 11.0758 467.632 0 481.04 0H509.895C523.303 0 534.378 11.0758 534.378 24.4833V80.4451H500.277C499.985 58.8765 499.111 40.514 498.236 24.4833Z",
  "M630.016 24.4833H624.478C623.313 42.8457 622.147 64.1229 621.855 90.0635H640.801C657.997 90.0635 666.158 102.305 666.158 114.547V180.127C666.158 193.534 655.082 204.61 641.675 204.61H612.82C599.412 204.61 588.336 193.534 588.336 180.127V124.165H622.147C622.147 140.487 623.313 164.388 624.478 180.127H630.016C630.891 161.765 632.057 140.487 632.348 114.547H613.403C596.206 114.547 588.336 102.305 588.336 90.0635V24.4833C588.336 11.0758 599.412 0 612.82 0H641.675C655.082 0 666.158 11.0758 666.158 24.4833V80.4451H632.057C632.057 64.1229 630.891 40.2225 630.016 24.4833Z",
  "M729.634 0C743.042 0 754.118 11.0758 754.118 24.4833V180.127C754.118 193.534 743.042 204.61 729.634 204.61H700.779C687.372 204.61 676.296 193.534 676.296 180.127V24.4833C676.296 11.0758 687.372 0 700.779 0H729.634ZM717.976 180.127C719.142 158.85 720.307 134.075 720.307 102.305C720.307 70.5352 719.142 45.7604 717.976 24.4833H712.438C710.98 45.7604 709.815 70.5352 709.815 102.305C709.815 134.075 710.98 158.85 712.438 180.127H717.976Z",
  "M817.872 0C831.279 0 842.355 11.0758 842.355 24.4833V180.127C842.355 193.534 831.279 204.61 817.872 204.61H789.016C775.609 204.61 764.533 193.534 764.533 180.127V24.4833C764.533 11.0758 775.609 0 789.016 0H817.872ZM806.213 180.127C807.379 158.85 808.545 134.075 808.545 102.305C808.545 70.5352 807.379 45.7604 806.213 24.4833H800.675C799.218 45.7604 798.052 70.5352 798.052 102.305C798.052 134.075 799.218 158.85 800.675 180.127H806.213Z",
  "M897.073 0.291464C901.445 50.4239 909.606 96.7672 914.27 127.08H918.933C915.727 95.0184 909.898 48.6751 906.692 0.291464H942.251V204.319H898.531C894.45 154.186 886.289 107.843 881.334 77.5304H876.671C880.168 109.592 885.706 155.935 888.912 204.319H853.353V0.291464H897.073Z",
];

export default function ComingSoonScreen() {
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
        <div className="w-[82vw] max-w-4xl overflow-hidden sm:w-[78vw]">
          <motion.svg
            viewBox="0 0 943 205"
            className="w-full overflow-visible"
            aria-label="development "
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
              filter: {
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <defs>
              {paths.map((_, i) => (
                <clipPath key={i} id={`letter-clip-${i}`}>
                  <rect width="943" height="205" />
                </clipPath>
              ))}
            </defs>

            {paths.map((d, i) => (
              <g key={i} clipPath={`url(#letter-clip-${i})`}>
                <motion.g
                  initial={{ y: STEP }}
                  animate={
                    splashDone
                      ? { y: [0, 0, -STEP, -STEP, 0] }
                      : { y: STEP }
                  }
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
        </div>
      </section>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center text-sm sm:bottom-12 sm:text-base md:text-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <p>
          This page is currently being crafted{" - "}
          <Link href="/" className="text-primary-light">
            Return to Home
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
