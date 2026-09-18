"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function HomeSignal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="relative w-full bg-black px-3 py-16 md:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[42vh] min-h-[280px] overflow-hidden rounded-2xl border border-white/10 md:h-[52vh]"
      >
        <Image
          src="/images/mira/mira-wide-signal.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#05070c] via-[#05070c]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-10 text-center md:pb-14">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
            Supply path clarity
          </p>
          <h2 className="max-w-3xl font-krisha text-3xl uppercase leading-none text-white md:text-5xl lg:text-6xl">
            Demand should see where traffic actually comes from.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            That&apos;s why sellers.json lives on the root domain — publisher
            identity stays visible across the mediation chain.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
