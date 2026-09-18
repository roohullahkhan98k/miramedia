"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/pages/PageShell";
import data from "@/data/about.json";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { Timeline } from "@/components/ui/timeline";

const journey = [
  {
    title: "Why",
    content: (
      <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
        Programmatic CTV was drowning in hops. Mira was built to cut the path —
        publisher to DSP, readable end to end.
      </p>
    ),
  },
  {
    title: "How",
    content: (
      <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
        OpenRTB mediation, VAST bridging, SSAI-ready pods, and sellers.json so
        every impression carries a clear origin.
      </p>
    ),
  },
  {
    title: "Now",
    content: (
      <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
        Demand desks and streaming publishers use the same lean layer — no
        portal theater, just clean fill and verified paths.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow={data.eyebrow}
      headline={data.headline}
      subheadline={data.subheadline}
    >
      <BlurFade delay={0.1} inView>
        <section className="relative mb-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:mb-28 md:p-12">
          <ShineBorder
            shineColor={["#7eb8d4", "#f4f7fb", "#c4b5a0"]}
            duration={14}
          />
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#7eb8d4]">
            {data.mission.title}
          </p>
          <TextGenerateEffect
            words={data.mission.body}
            className="font-normal"
            duration={0.35}
          />
        </section>
      </BlurFade>

      <section className="mb-20 md:mb-28">
        <BlurFade delay={0.05} inView>
          <p className="mb-10 text-xs uppercase tracking-[0.35em] text-white/35">
            Principles
          </p>
        </BlurFade>
        <ul className="grid gap-4 md:grid-cols-3">
          {data.principles.map((item, i) => (
            <BlurFade key={item.title} delay={0.1 + i * 0.08} inView>
              <li className="relative min-h-[220px] list-none rounded-2xl border border-white/10 p-2 md:min-h-[260px]">
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1.5}
                  variant="white"
                />
                <div className="relative flex h-full flex-col rounded-xl border border-white/5 bg-black/40 p-6">
                  <div className="mb-6 text-xs tracking-widest text-[#7eb8d4]">
                    / {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-3 font-krisha text-2xl uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section className="mb-20 md:mb-28">
        <Timeline
          data={journey}
          title="The Mira path"
          description="A short arc from the problem we saw to the network we run."
          accent="#f4f7fb"
        />
      </section>

      <BlurFade delay={0.1} inView>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/60 p-8 md:p-12">
          <BorderBeam
            size={100}
            duration={9}
            colorFrom="#7eb8d4"
            colorTo="#f4f7fb"
          />
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
            Partner with us
          </p>
          <h3 className="mb-6 max-w-xl font-krisha text-3xl uppercase md:text-5xl">
            Demand or supply — same clean mediation layer.
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?role=demand"
              className="inline-flex items-center gap-3 rounded-xl bg-primary py-2 pl-5 pr-2 font-medium text-black"
            >
              Advertisers
              <span className="rounded-lg bg-black p-2">
                <ArrowUpRight className="size-5 text-primary" />
              </span>
            </Link>
            <Link
              href="/contact?role=supply"
              className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 py-2 pl-5 pr-2 font-medium text-white"
            >
              Publishers
              <span className="rounded-lg bg-white p-2">
                <ArrowUpRight className="size-5 text-black" />
              </span>
            </Link>
          </div>
        </div>
      </BlurFade>
    </PageShell>
  );
}
