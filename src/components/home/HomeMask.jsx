"use client";

import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function HomeMask() {
  return (
    <section className="relative w-full border-y border-white/10 bg-black">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Hover to reveal the path —{" "}
            <span className="text-white/40">
              publisher → Mira → DSP, printed in sellers.json.
            </span>
          </p>
        }
        className="rounded-none"
      >
        <p className="text-black">
          Transparent OpenRTB. No dark hops.{" "}
          <span className="text-black/55">
            Every impression carries a readable supply path.
          </span>
        </p>
      </MaskContainer>
    </section>
  );
}
