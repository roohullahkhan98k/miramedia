"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card";

const SERVICES = [
  {
    ...site.solutions.items[0],
    image: "/images/mira/mira-demand.jpg",
  },
  {
    ...site.solutions.items[1],
    image: "/images/mira/mira-supply.jpg",
  },
];
const WORDS = site.solutions.typewriterWords;

const STACK_TOP = 90;
const STACK_GAP = 110;

function useTypewriter(words) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = isDeleting ? 60 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words]);

  return display;
}

function ServiceCard({ service, index }) {
  const stickyTop = STACK_TOP + index * STACK_GAP;

  return (
    <article
      className="md:sticky"
      style={{ top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      <div className="grid overflow-hidden border-t border-white/20 bg-black text-white md:grid-cols-3 px-3 md:gap-x-6 md:px-8 md:py-6 lg:gap-x-8">
        <div className="grid grid-cols-1 md:col-span-2 md:grid-cols-2 md:grid-rows-[auto_1fr]">
          <div className="flex items-start justify-between px-6 pb-10 pt-8 md:col-span-2 md:px-0 md:pb-14 md:pt-0">
            <h3 className="font-krisha text-5xl uppercase leading-none sm:text-7xl md:text-8xl">
              {service.title}
            </h3>
            <div className="text-sm tracking-widest text-primary md:text-base">
              / {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="px-6 pb-8 md:px-0 md:pb-6">
            <p className="max-w-sm text-base leading-snug text-white/65 md:text-lg">
              {service.description}
            </p>
            {service.href && (
              <Link
                href={service.href}
                className="mt-6 inline-flex text-sm uppercase tracking-widest text-primary hover:text-primary-light"
              >
                Learn more →
              </Link>
            )}
          </div>

          <div className="px-6 pb-10 md:px-0 md:pb-6">
            <ul className="grid w-full gap-y-0.5 text-base leading-snug text-white/65">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <CardContainer
          containerClassName="py-0! flex w-full justify-center md:justify-end"
          className="w-full"
        >
          <CardBody className="relative mb-6 h-72 w-full rounded-xl bg-neutral-900 md:mb-0 md:h-96 md:w-full">
            <CardItem
              translateZ={60}
              className="absolute inset-0 h-full w-full overflow-hidden rounded-xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#05070c]/70 via-transparent to-transparent" />
            </CardItem>
            <CardItem
              translateZ={90}
              className="absolute bottom-5 left-5 rounded-lg bg-black/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-sm"
            >
              {service.title}
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </article>
  );
}

export default function HomeServices() {
  const typed = useTypewriter(WORDS);
  const lines = site.solutions.headlineLines;

  return (
    <section className="relative w-full border-y border-white/20 bg-black py-8 text-white">
      <div className="pb-32 pt-14">
        <div className="mb-5 text-center text-sm uppercase tracking-[0.35em] opacity-50">
          {site.solutions.eyebrow}
        </div>

        <h2 className="text-center font-krisha text-4xl uppercase leading-[0.85] text-white md:text-7xl lg:text-9xl">
          {lines.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <span className="font-krisha font-normal italic text-primary">
            {typed}
            <div className="ml-5 inline-block h-[0.8em] w-2 rotate-15 animate-[blink_0.8s_ease-in-out_infinite] bg-primary align-middle" />
          </span>
        </h2>
      </div>

      <div>
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
