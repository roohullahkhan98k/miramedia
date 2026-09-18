"use client";

import PageShell from "@/components/pages/PageShell";
import HomeGallery from "@/components/home/HomeGallery";
import data from "@/data/publishers.json";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Timeline } from "@/components/ui/timeline";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { Boxes } from "@/components/ui/background-boxes";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

const STICKY_CODES = ["S2S", "FLOOR", "SSAI", "PAY"];

const stickyContent = data.features.map((item, i) => ({
  title: item.title,
  description: item.body,
  content: (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0c0a09] p-2">
      <EvervaultCard text={STICKY_CODES[i] || "CTV"} className="aspect-auto!" />
      <p className="pointer-events-none absolute bottom-4 left-4 z-20 text-[10px] uppercase tracking-[0.3em] text-[#c4b5a0]">
        Supply · {String(i + 1).padStart(2, "0")}
      </p>
    </div>
  ),
}));

const timelineData = data.process.steps.map((step, i) => ({
  title: `0${i + 1}`,
  content: (
    <div>
      <h4 className="mb-3 font-krisha text-2xl uppercase text-white md:text-3xl">
        {step.title}
      </h4>
      <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-base">
        {step.body}
      </p>
    </div>
  ),
}));

export default function PublishersPage() {
  return (
    <>
      <PageShell
        eyebrow={data.eyebrow}
        headline={data.headline}
        subheadline={data.subheadline}
        cta={data.cta}
      >
        <BlurFade delay={0.1} inView>
          <div className="relative mb-16 h-64 overflow-hidden rounded-2xl border border-white/10 bg-black md:mb-24 md:h-80">
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-20 h-full w-full bg-black [mask-image:radial-gradient(transparent,white)]",
              )}
            />
            <Boxes />
            <div className="relative z-30 flex h-full flex-col justify-end p-6 md:p-10">
              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c4b5a0]">
                Supply path
              </p>
              <EncryptedText
                text="FAST apps. Low-latency fill."
                className="font-clash text-xl font-semibold text-white md:text-3xl"
                revealDelayMs={28}
                flipDelayMs={40}
              />
              <p className="mt-3 max-w-md text-sm text-white/55">
                Hover the grid — live mediation field, zero stock photography.
              </p>
            </div>
            <BorderBeam
              size={120}
              duration={8}
              colorFrom="#c4b5a0"
              colorTo="#f4f7fb"
              borderWidth={1.5}
            />
          </div>
        </BlurFade>

        <section className="mb-20 md:mb-28">
          <BlurFade delay={0.05} inView>
            <p className="mb-8 text-xs uppercase tracking-[0.35em] text-white/35">
              Publisher platform features
            </p>
          </BlurFade>
          <StickyScroll content={stickyContent} tone="warm" />
        </section>

        <section className="mb-20 md:mb-28">
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#c4b5a0]">
              {data.stack.eyebrow}
            </p>
            <h3 className="mb-10 font-krisha text-3xl uppercase md:text-5xl">
              {data.stack.headline}
            </h3>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-2">
            {data.stack.rows.map((row, i) => (
              <BlurFade key={row.label} delay={0.08 * i} inView>
                <CardSpotlight
                  className="relative overflow-hidden rounded-2xl border-white/10 bg-black p-6 md:p-8"
                  color="#1a1510"
                  radius={280}
                >
                  <ShineBorder
                    shineColor={["#c4b5a0", "#f4f7fb", "#c4b5a0"]}
                    duration={12}
                  />
                  <div className="relative z-10 text-xs uppercase tracking-widest text-white/35">
                    {row.label}
                  </div>
                  <div className="relative z-10 mt-3 text-sm text-white/75 md:text-base">
                    {row.value}
                  </div>
                </CardSpotlight>
              </BlurFade>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {data.integrations.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 px-4 py-2 text-xs uppercase tracking-widest text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-20 md:mb-28">
          <Timeline
            data={timelineData}
            title={data.process.eyebrow}
            description="From inventory profile to live fill against transparent paths."
            accent="#c4b5a0"
          />
        </section>

        <BlurFade delay={0.1} inView>
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
            <BorderBeam
              size={80}
              duration={10}
              colorFrom="#c4b5a0"
              colorTo="#f4f7fb"
              reverse
            />
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/30">
              Quiet details
            </p>
            <ul className="space-y-4">
              {data.mutedNotes.map((note) => (
                <li
                  key={note}
                  className="border-l border-[#c4b5a0]/50 pl-4 text-sm leading-relaxed text-white/45"
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </BlurFade>
      </PageShell>

      <div className="relative z-10 bg-black">
        <HomeGallery />
      </div>
    </>
  );
}
