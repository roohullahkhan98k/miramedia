"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import FadeInScroll from "@/animations/FadeInScroll";

const MOVE_START = 0; // no gap after pin starts
const MOVE_END = 0.95; // longer movement, still a small hold window

const blocks = [
  // One block per column (0..5). `top` is randomized-ish but spaced out.
  // `speed` controls parallax intensity (higher = moves faster).
  {
    col: 0,
    top: "59%",
    speed: 0.8,
    src: "/images/HomeGalleryImages/column-1.jpg",
  },
  {
    col: 1,
    top: "3%",
    speed: 0.9,
    src: "/images/HomeGalleryImages/column-2.mp4",
  },
  {
    col: 1,
    top: "99%",
    speed: 1.12,
    src: "/images/HomeGalleryImages/column-2-2.mp4",
  },
  {
    col: 2,
    top: "55%",
    speed: 1.5,
    src: "/images/HomeGalleryImages/column-3.jpg",
  },
  {
    col: 2,
    top: "150%",
    speed: 1.28,
    src: "/images/HomeGalleryImages/column-3-2.mp4",
  },
  {
    col: 3,
    top: "85%",
    speed: 0.9,
    src: "/images/HomeGalleryImages/column-4.jpg",
  },
  {
    col: 4,
    top: "35%",
    speed: 1.1,
    src: "/images/HomeGalleryImages/column-5.mp4",
  },
  {
    col: 4,
    top: "120%",
    speed: 0.96,
    src: "/images/HomeGalleryImages/column-5-2.jpg",
  },
  {
    col: 5,
    top: "75%",
    speed: 1.0,
    src: "/images/HomeGalleryImages/column-6.jpg",
  },
];

export default function HomeGallery() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yTransforms = blocks.map((b) => {
    // Simple parallax: start below, end above, at different speeds.
    // Increase travel distance (not speed) so all blocks exit the viewport
    // before the pinned section ends.
    const fromVh = 225 * b.speed;
    const toVh = -225 * b.speed;
    return useTransform(
      scrollYProgress,
      [0, MOVE_START, MOVE_END, 1],
      [`${fromVh}vh`, `${fromVh}vh`, `${toVh}vh`, `${toVh}vh`],
    );
  });

  return (
    <>
      {/* Mobile: simplified grid version */}
      <section className="md:hidden w-full bg-black text-white px-2 sm:px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs tracking-widest opacity-60">
            CONNECTED TV
          </span>
          <h2 className="text-3xl sm:text-4xl uppercase font-bold mt-4">
            Premium inventory. Clean paths.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-white/45">
            Streaming environments and protocol surfaces — the places Mira
            actually routes through.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {blocks.slice(0, 6).map((b) => (
              <div
                key={b.src}
                className="bg-white/5 backdrop-blur-xs overflow-hidden rounded-xl"
              >
                {isVideoSrc(b.src) ? (
                  <video
                    src={b.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="block w-full h-full object-cover aspect-4/5"
                  />
                ) : (
                  <Image
                    src={b.src}
                    alt=""
                    width={1200}
                    height={1500}
                    sizes="(min-width: 640px) 50vw, 50vw"
                    className="block w-full h-full object-cover aspect-4/5"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: original pinned parallax */}
      <motion.section
        ref={sectionRef}
        className="hidden md:block relative w-full h-[520vh] bg-black"
      >
        {/* Top fade to blend into previous section */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-52 bg-linear-to-b from-black to-transparent z-20" />

        {/* PINNED AREA */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* GRID / CARDS LAYER */}
          <div className="relative h-full w-full grid grid-cols-6 border-t border-white/10 z-10">
            {Array.from({ length: 6 }).map((_, colIdx) => (
              <div
                key={colIdx}
                className={`relative h-full ${
                  colIdx < 5 ? "border-r border-white/10" : ""
                }`}
              >
                {blocks.map((b, i) => {
                  if (b.col !== colIdx) return null;

                  return (
                    <motion.div
                      key={i}
                      style={{
                        y: yTransforms[i],
                        top: b.top,
                      }}
                      className="absolute left-0 right-0 mx-auto w-[92%] bg-white/5 backdrop-blur-xs overflow-hidden"
                    >
                      {isVideoSrc(b.src) ? (
                        <video
                          src={b.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="block w-full h-auto"
                        />
                      ) : (
                        <Image
                          src={b.src}
                          alt=""
                          width={2000}
                          height={1200}
                          sizes="(min-width: 768px) 16vw, 50vw"
                          className="block w-full h-auto"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* TEXT LAYER */}
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none z-50 isolate">
            <FadeInScroll
              className="col-start-3 col-span-2 flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-8"
              initialY={24}
              amount={0.8}
            >
              <span className="text-xs tracking-widest opacity-60 text-white mix-blend-difference">
                CONNECTED TV
              </span>

              <h2 className="text-6xl uppercase font-bold mt-4 text-white mix-blend-difference">
                Premium inventory. Clean paths.
              </h2>
            </FadeInScroll>
          </div>
        </div>

        {/* Bottom fade to blend into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-linear-to-t from-black to-transparent z-20" />
      </motion.section>
    </>
  );
}

function isVideoSrc(src) {
  return /\.mp4($|\?)/i.test(src);
}
