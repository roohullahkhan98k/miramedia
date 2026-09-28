"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useSplash } from "@/components/layout/Splash/SplashContext";
import HeroText from "./HeroText";
import site from "@/data/site.json";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const fadeUp = (delay, splashDone) => ({
  initial: { opacity: 0, y: 28 },
  animate: splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const FLIP = ["Connected TV", "OpenRTB paths", "SSAI pods", "clean supply"];

const HomeHero = () => {
  const { splashDone } = useSplash();
  const { hero } = site;

  return (
    <HeroHighlight
      containerClassName="!h-screen !min-h-screen !items-stretch !justify-start !bg-transparent dark:!bg-transparent"
      className="flex h-full w-full flex-col px-4 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32"
    >
      <HeroText />

      <div className="mt-auto grid w-full gap-8 md:grid-cols-12 md:items-end md:gap-10">
        <motion.div
          className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 md:col-span-5 lg:col-span-4"
          {...fadeUp(1.0, splashDone)}
        >
          <Image
            src="/images/mira/mira-hero-ctv.jpg"
            alt="Mira Media CTV — OpenRTB bidstream and transparent value"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="flex flex-col gap-6 md:col-span-7 md:items-end lg:col-span-8">
          <motion.div
            className="max-w-xl text-base leading-relaxed text-white/70 md:text-right md:text-lg"
            {...fadeUp(1.1, splashDone)}
          >
            <span className="text-white/45">Built for </span>
            <span className="relative inline-block max-w-full overflow-hidden align-bottom">
              <FlipWords
                words={FLIP}
                className="px-0 font-medium text-[#7eb8d4] dark:text-[#7eb8d4]"
                duration={2600}
              />
            </span>
            <p className="mt-3 text-white/65">
              {hero.subheadline.split(".")[0]}.{" "}
              <Highlight className="bg-gradient-to-r from-[#7eb8d4]/35 to-transparent text-white dark:from-[#7eb8d4]/30 dark:to-transparent">
                No middleman bloat.
              </Highlight>
            </p>
          </motion.div>

          <motion.div
            className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:justify-end"
            {...fadeUp(1.2, splashDone)}
          >
            <MovingBorderButton
              as={Link}
              href={hero.primaryCta.href}
              borderRadius="0.9rem"
              containerClassName="h-12 w-full min-w-[220px] sm:w-auto"
              borderClassName="bg-[radial-gradient(#7eb8d4_40%,transparent_60%)]"
              className="border-white/15 bg-primary text-sm font-medium text-black"
              duration={3500}
            >
              <span className="inline-flex items-center gap-3 px-2">
                {hero.primaryCta.label}
                <span className="rounded-lg bg-black p-1.5">
                  <ArrowUpRight
                    className="size-4 text-primary"
                    strokeWidth={2.5}
                  />
                </span>
              </span>
            </MovingBorderButton>

            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-between gap-4 rounded-xl border border-white/20 bg-white/5 px-5 font-medium text-white backdrop-blur-sm"
            >
              {hero.secondaryCta.label}
              <span className="rounded-lg bg-white p-2">
                <ArrowUpRight
                  className="size-4 text-black"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default HomeHero;
