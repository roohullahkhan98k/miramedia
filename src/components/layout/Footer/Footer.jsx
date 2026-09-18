"use client";

import FooterText from "./FooterText";
import { HoverText, LinkHover } from "@/components/ui";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import site from "@/data/site.json";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "0px 0px -12% 0px",
  });

  const reveal = (delay = 0) => ({
    initial: { y: 24, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 },
    transition: {
      duration: 0.78,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <div
      className="relative h-auto md:h-[500px]"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div className="relative top-0 h-auto md:-top-[100vh] md:h-[calc(100vh+500px)]">
        <div className="relative h-auto md:sticky md:top-[calc(100vh-500px)] md:h-[500px]">
          <footer
            ref={footerRef}
            className="flex min-h-screen flex-col bg-primary text-black md:h-full md:min-h-0"
          >
            <div className="grid flex-1 border-b border-black/20 md:grid-cols-5">
              <motion.div
                {...reveal(0.05)}
                className="flex flex-col border-b border-black/20 px-5 py-5 last:border-b-0 md:col-span-2 md:border-b-0 md:border-r md:px-8 md:py-10"
              >
                <div className="mb-4 text-xs font-medium uppercase tracking-widest md:mb-7">
                  Contact
                </div>

                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-lg"
                >
                  <LinkHover text={site.email} arrowClassName="size-5" />
                </a>

                <div className="mt-8 md:mt-auto">
                  <div className="text-sm leading-relaxed text-black/60">
                    <div>Programmatic CTV mediation</div>
                    <div>Supply &amp; demand partnerships</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...reveal(0.15)}
                className="border-b border-black/20 px-5 py-5 md:border-b-0 md:border-r md:px-8 md:py-10"
              >
                <div className="mb-3 text-xs font-medium uppercase tracking-widest md:mb-7">
                  Navigation
                </div>

                <div className="flex flex-col gap-0.5 text-base md:gap-1">
                  {site.footerNav.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link}
                      className="w-max text-base md:text-lg"
                    >
                      <HoverText>{link.title}</HoverText>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...reveal(0.25)}
                className="border-b border-black/20 px-5 py-5 md:border-b-0 md:border-r md:px-8 md:py-10"
              >
                <div className="mb-3 text-xs font-medium uppercase tracking-widest md:mb-7">
                  Resources
                </div>

                <div className="flex flex-col gap-0.5 text-base md:gap-1">
                  {site.footerResources.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link}
                      className="w-max text-base md:text-lg"
                    >
                      <HoverText>{link.title}</HoverText>
                    </Link>
                  ))}
                  {site.socialLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-max text-base md:text-lg"
                    >
                      <LinkHover text={link.title} arrowClassName="size-4" />
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...reveal(0.35)}
                className="px-5 py-5 md:px-8 md:py-10"
              >
                <div className="mb-3 text-xs font-medium uppercase tracking-widest md:mb-7">
                  Legal
                </div>

                <div className="flex flex-col gap-0.5 text-base md:gap-1">
                  {site.legalLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link}
                      className="w-max text-base md:text-lg"
                    >
                      <HoverText>{link.title}</HoverText>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-stretch md:justify-between md:gap-12 md:px-8 md:pb-8 md:pt-11">
              <motion.div {...reveal(0.45)} className="flex items-end text-sm">
                {site.copyright}
              </motion.div>

              <div className="flex w-full items-center justify-end md:w-1/2">
                <FooterText isInView={isInView} />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
