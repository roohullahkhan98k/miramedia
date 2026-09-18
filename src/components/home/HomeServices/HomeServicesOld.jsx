"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const SERVICES = [
  {
    title: "Product Design",
    image: "/images/HomeServiceImages/01.png",
    description:
      "We design products that feel clear, intuitive, and easy to use, with every detail shaped around real people and real goals.",
    items: [
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Interaction Design",
      "Usability Testing",
      "Motion & Micro-interactions",
    ],
  },
  {
    title: "Product Engineering",
    image: "/images/HomeServiceImages/02.png",
    description:
      "We turn ideas into reliable digital products that are fast, scalable, and ready to perform in the real world.",
    items: [
      "Frontend Development",
      "Backend Development",
      "API Development",
      "Mobile Apps (iOS & Android)",
      "Web Platforms",
      "Database Architecture",
      "QA & Testing",
      "Performance Optimization",
    ],
  },
  {
    title: "Products & Platforms",
    image: "/images/HomeServiceImages/03.png",
    description:
      "We take full ownership from idea to launch, bringing design, engineering, and product thinking together under one roof.",
    items: [
      "SaaS Product Development",
      "Custom Platforms",
      "System Architecture",
      "Third-Party Integrations",
      "Cloud Deployment",
      "Maintenance & Scaling",
    ],
  },
  {
    title: "Automation",
    image: "/images/HomeServiceImages/04.png",
    description:
      "We build intelligent systems that reduce manual work, connect your tools, and keep operations running smoothly at scale.",
    items: [
      "Workflow Automation",
      "API Automation",
      "CRM & Tool Integrations",
      "Data Pipelines",
      "Reporting Automation",
      "AI-Powered Workflows",
      "Custom Bots",
    ],
  },
];

const WORDS = ["Engineering.", "Strategy."];

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
  const cardRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["end end", "center center"],
  });
  const imageHeight = useTransform(scrollYProgress, [0, 1], ["12rem", "26rem"]);

  return (
    <div className="border-t border-white/20 last:border-b">
      <div
        ref={cardRef}
        className="flex min-h-48 w-full flex-col gap-12 py-3 text-white md:flex-row md:items-stretch md:justify-between md:gap-8 md:py-6"
      >
        <div className="flex min-h-48 flex-1 flex-col justify-between">
          <h3 className="font-krisha text-6xl md:text-8xl">{service.title}</h3>
          <p className="max-w-md text-base text-white/65">
            {service.description}
          </p>
        </div>

        <div className="flex shrink-0 items-start gap-4 md:w-5/12">
          <div className="pt-1 text-sm tracking-widest text-primary">
            / {String(index + 1).padStart(2, "0")}
          </div>
          <motion.div
            className="relative flex flex-1 items-center justify-center origin-right overflow-hidden rounded-xl"
            style={{ height: imageHeight }}
          >
            <Image
              src={service.image}
              alt={service.title}
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HomeServices() {
  const typed = useTypewriter(WORDS);

  return (
    <section className="relative w-full bg-black py-8 text-white border-white/20 border-y px-3 md:px-8">
      {/* Header */}
      <div className="pt-14 pb-32">
        <div className="text-sm uppercase tracking-[0.35em] opacity-50 mb-5 text-center">
          SERVICES
        </div>

        <h2 className="text-4xl md:text-7xl lg:text-9xl font-krisha uppercase leading-[0.85] text-white text-center">
          WHAT YOU GET
          <br />
          WHEN DESIGN
          <br />
          MEETS
          <br />
          <span className="font-krisha italic font-normal text-primary">
            {typed}
            <div className="animate-[blink_0.8s_ease-in-out_infinite] inline-block w-2 h-[0.8em] bg-primary align-middle ml-5 rotate-15" />
          </span>
        </h2>
      </div>

      {/* Cards */}
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
