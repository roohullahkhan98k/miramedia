"use client";

import site from "@/data/site.json";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const ITEMS = [
  {
    title: "Roku",
    image: "/images/mira/platforms/roku.svg",
    className: "absolute top-[8%] left-[8%] -rotate-[8deg]",
  },
  {
    title: "Amazon Fire TV",
    image: "/images/mira/platforms/firetv.svg",
    className: "absolute top-[4%] right-[12%] rotate-[6deg]",
  },
  {
    title: "Apple TV",
    image: "/images/mira/platforms/appletv.svg",
    className: "absolute top-[28%] left-[28%] rotate-[3deg]",
  },
  {
    title: "Android TV",
    image: "/images/mira/platforms/androidtv.svg",
    className: "absolute bottom-[18%] left-[10%] rotate-[-5deg]",
  },
  {
    title: "Samsung Tizen",
    image: "/images/mira/platforms/samsung.svg",
    className: "absolute bottom-[12%] right-[18%] rotate-[9deg]",
  },
  {
    title: "LG webOS",
    image: "/images/mira/platforms/lg.svg",
    className: "absolute top-[42%] right-[6%] -rotate-[3deg]",
  },
];

export default function HomePartners() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black text-white">
      <div className="relative z-20 mx-auto max-w-3xl px-4 pb-6 pt-20 text-center md:pt-28">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/40">
          {site.partners.eyebrow}
        </p>
        <h2 className="font-clash text-3xl font-semibold uppercase tracking-[-0.03em] md:text-5xl">
          Screens we already route
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/45 md:text-base">
          Grab a card and drag it — polaroid pile of the CTV surfaces Mira
          mediates every day.
        </p>
      </div>

      <DraggableCardContainer className="relative h-[720px] w-full overflow-hidden md:h-[820px]">
        <p className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 text-center font-clash text-2xl font-semibold uppercase leading-tight tracking-[-0.03em] text-white/10 md:text-4xl">
          Drag the stack. Find your screen.
        </p>

        {ITEMS.map((item) => (
          <DraggableCardBody
            key={item.title}
            className={`min-h-0 w-56 cursor-grab bg-[#111] p-3 active:cursor-grabbing md:w-64 ${item.className}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="pointer-events-none relative z-10 h-64 w-full rounded-sm object-cover md:h-72"
            />
            <h3 className="relative z-10 mt-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/80 md:text-base">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
