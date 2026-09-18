"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";

/** Aceternity Text Hover Effect — try-it strip under the hero brand. */
export default function HomeTextHover() {
  return (
    <section className="relative w-full border-b border-white/10 bg-black py-10 md:py-16">
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.4em] text-white/30">
        Hover the wordmark
      </p>
      <div className="mx-auto h-28 w-full max-w-4xl px-4 md:h-40">
        <TextHoverEffect text="MIRA" />
      </div>
    </section>
  );
}
