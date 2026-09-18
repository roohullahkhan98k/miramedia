"use client";

import { motion } from "motion/react";
import TimezoneTicker from "./TimezoneTicker";
import Link from "next/link";
import site from "@/data/site.json";

const EASE = [0.22, 1, 0.36, 1];

export default function NavLogo({ isSwitched, setIsOpen }) {
  return (
    <div className="relative overflow-hidden">
      <motion.span
        className="block whitespace-nowrap"
        animate={{ y: isSwitched ? "-120%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2">
          <div className="size-2 shrink-0 animate-pulse rounded-full bg-primary" />
          <TimezoneTicker />
        </div>
      </motion.span>

      <Link href="/" onClick={() => setIsOpen(false)}>
        <motion.div
          className="absolute inset-0 flex items-center px-1 md:px-0"
          animate={{ y: isSwitched ? "0%" : "115%" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="font-clash text-lg font-semibold uppercase tracking-[0.18em] text-primary md:text-xl">
            {site.brand}
          </span>
        </motion.div>
      </Link>
    </div>
  );
}
