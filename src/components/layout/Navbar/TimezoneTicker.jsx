"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ZONES = [
  { label: "PAK", abbr: "PKT", tz: "Asia/Karachi" },
  { label: "USA", abbr: "ET", tz: "America/New_York" },
  { label: "UK", abbr: "GMT", tz: "Europe/London" },
];

function fmt(tz) {
  const raw = new Date().toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  // "01:55:07 AM" -> { hh:"01", mm:"55", ss:"07", ampm:"AM" }
  const [timePart, ampm = ""] = raw.split(" ");
  const [hh = "", mm = "", ss = ""] = (timePart || "").split(":");
  return { hh, mm, ss, ampm };
}

export default function TimezoneTicker() {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [times, setTimes] = useState(() =>
    ZONES.map(() => ({ hh: "", mm: "", ss: "", ampm: "" })),
  );

  useEffect(() => {
    setMounted(true);
    setTimes(ZONES.map((z) => fmt(z.tz)));
  }, []);

  // tick every second
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setTimes(ZONES.map((z) => fmt(z.tz))), 1000);
    return () => clearInterval(id);
  }, [mounted]);

  // advance zone every 2.8 s
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % ZONES.length), 2800);
    return () => clearInterval(id);
  }, [mounted]);

  const zone = ZONES[idx];

  return (
    <div className="relative overflow-hidden h-5">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-sm font-light whitespace-nowrap"
        >
          <span className="text-xs opacity-40 tracking-widest uppercase">
            {zone.abbr}
          </span>
          <span>{zone.label}</span>
          <span className="tabular-nums opacity-60" suppressHydrationWarning>
            {mounted ? (
              <>
                {times[idx].hh} <span className="opacity-60">:</span>{" "}
                {times[idx].mm}{" "}
                <span className="hidden md:inline">
                  <span className="opacity-60">:</span> {times[idx].ss}{" "}
                </span>
                {times[idx].ampm}
              </>
            ) : (
              "—"
            )}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
