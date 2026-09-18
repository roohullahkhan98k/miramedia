"use client";

import { motion } from "motion/react";
import WorldMap from "@/components/ui/world-map";

const DOTS = [
  {
    label: "US West ↔ East coast CTV",
    start: { lat: 40.7128, lng: -74.006, label: "New York" },
    end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  },
  {
    label: "LATAM supply path",
    start: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
    end: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  },
  {
    label: "Transatlantic demand",
    start: { lat: 40.7128, lng: -74.006, label: "New York" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    label: "EMEA hub",
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  },
  {
    label: "MENA → South Asia",
    start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  },
  {
    label: "APAC mediation",
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
  {
    label: "Africa reach",
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
  },
];

export default function HomeWorldMap() {
  return (
    <section className="relative w-full bg-black px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">
          Global CTV mediation
        </p>
        <h2 className="font-clash text-3xl font-semibold uppercase tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
          Supply meets{" "}
          <span className="text-white/40">
            {"demand".split("").map((char, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
          Transparent OpenRTB paths across US, EMEA, and LATAM — hover a route
          to see the city pair. Arcs animate when the map scrolls into view.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <WorldMap dots={DOTS} lineColor="#f4f7fb" />
      </div>
    </section>
  );
}
