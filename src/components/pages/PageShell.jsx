"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useSplash } from "@/components/layout/Splash/SplashContext";

const MeshBackground = dynamic(
  () => import("@/components/common/MeshBackground"),
  { ssr: false },
);

export default function PageShell({
  eyebrow,
  headline,
  subheadline,
  cta,
  children,
}) {
  const { splashDone } = useSplash();

  return (
    <main className="relative min-h-dvh bg-black text-white">
      <MeshBackground />
      <div className="relative z-10 px-3 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-4xl md:mb-24"
        >
          {eyebrow && (
            <p className="mb-6 font-poppins text-xs uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="font-krisha text-5xl leading-none uppercase sm:text-7xl lg:text-8xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              {subheadline}
            </p>
          )}
          {cta && (
            <Link
              href={cta.href}
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-primary py-2 pl-5 pr-2 font-medium text-black"
            >
              {cta.label}
              <span className="rounded-lg bg-black p-2">
                <ArrowUpRight className="size-5 text-primary" />
              </span>
            </Link>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
