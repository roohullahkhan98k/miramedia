"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import extras from "@/data/homeExtras.json";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function HomePaths() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const visuals = [
    {
      image: "/images/mira/mira-demand.jpg",
      containerClassName: "bg-[#0a1628] min-h-[420px]",
    },
    {
      image: "/images/mira/mira-supply.jpg",
      containerClassName: "bg-[#14110e] min-h-[420px]",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full border-y border-white/15 bg-black text-white"
    >
      <div className="px-4 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">
            {extras.paths.eyebrow}
          </p>
          <h2 className="font-krisha text-4xl uppercase leading-none md:text-6xl lg:text-7xl">
            {extras.paths.headline}
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {extras.paths.items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WobbleCard
                containerClassName={visuals[i].containerClassName}
                className="flex min-h-[420px] flex-col justify-between py-10"
              >
                <div>
                  <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/40">
                    {item.role}
                  </p>
                  <h3 className="mb-4 font-krisha text-4xl uppercase leading-none md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mb-6 max-w-md text-base leading-relaxed text-white/60">
                    {item.body}
                  </p>
                  <ul className="mb-8 space-y-2 text-sm text-white/45">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={visuals[i].image}
                    alt={item.title}
                    className="h-40 w-full object-cover opacity-80 md:h-48"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <Link
                  href={item.cta.href}
                  className="mt-6 inline-flex w-max items-center gap-3 rounded-xl bg-primary py-2 pl-5 pr-2 font-medium text-black"
                >
                  {item.cta.label}
                  <span className="rounded-lg bg-black p-2">
                    <ArrowUpRight className="size-5 text-primary" />
                  </span>
                </Link>
              </WobbleCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="px-4 py-4 md:px-8">
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/30">
            {extras.capabilities.eyebrow}
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-3 lg:grid-cols-6">
          {extras.capabilities.items.map((cap) => (
            <div
              key={cap.label}
              className="border-b border-r border-white/10 px-5 py-7 last:border-r-0 md:px-6"
            >
              <div className="text-sm uppercase tracking-widest text-white/70">
                {cap.label}
              </div>
              <div className="mt-2 text-xs text-white/35">{cap.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
