import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinkHover } from "@/components/ui";
import site from "@/data/site.json";

const getVerticalSide = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const top = y;
  const bottom = rect.height - y;
  return top <= bottom ? "top" : "bottom";
};

const getYOffset = (side) => (side === "top" ? "-100%" : "100%");

const HoverMarquee = ({ text }) => (
  <span
    className={[
      "block font-clash font-semibold uppercase leading-none",
      "text-[clamp(2.5rem,9dvh,5.5rem)]",
    ].join(" ")}
    style={{ ["--mira-marquee-duration"]: "50s" }}
  >
    <span className="mira-marquee-track inline-flex whitespace-nowrap">
      <span className="inline-flex items-center gap-4 whitespace-nowrap pr-4">
        {Array.from({ length: 10 }).map((_, j) => (
          <span key={`a-${j}`} className="inline-flex items-center gap-4">
            <span>{text}</span>
            <div className="mx-2 mt-1 flex items-center justify-center rounded-full bg-black p-1.5 text-primary">
              <ArrowUpRight className="size-7 md:size-10" />
            </div>
          </span>
        ))}
      </span>
      <span
        className="inline-flex items-center gap-4 whitespace-nowrap pr-4"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, j) => (
          <span key={`b-${j}`} className="inline-flex items-center gap-4">
            <span>{text}</span>
            <span className="size-2.5 rounded-full bg-current opacity-70" />
          </span>
        ))}
      </span>
    </span>
  </span>
);

const MenuRow = ({
  menuLink,
  i,
  pathname,
  onClose,
  revealUp,
  hoverEnabled,
}) => {
  const [enterDir, setEnterDir] = useState("top");
  const [exitDir, setExitDir] = useState("top");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!hoverEnabled) setIsHovered(false);
  }, [hoverEnabled]);

  return (
    <Link
      href={menuLink.link}
      onClick={onClose}
      onMouseEnter={(e) => {
        if (!hoverEnabled) return;
        const dir = getVerticalSide(e);
        setEnterDir(dir);
        setExitDir(dir);
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        if (!hoverEnabled) return;
        setExitDir(getVerticalSide(e));
        setIsHovered(false);
      }}
      className="group relative flex min-h-0 flex-1 items-center justify-center gap-2 overflow-hidden py-0"
    >
      {hoverEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden bg-primary text-black"
          initial={false}
          animate={
            isHovered
              ? { x: "0%", y: "0%" }
              : { x: "0%", y: getYOffset(exitDir || enterDir) }
          }
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex h-full items-center justify-center">
            <HoverMarquee text={menuLink.hover} />
          </div>
        </motion.div>
      )}

      <span className="-ml-2 mt-0.5 shrink-0 overflow-hidden text-[10px] tracking-widest opacity-40 md:-ml-4 md:text-xs">
        <motion.span variants={revealUp} className="block">
          {(i + 1).toString().padStart(2, "0")}
        </motion.span>
      </span>

      <span className="overflow-hidden">
        <motion.span
          variants={revealUp}
          className={[
            "block font-clash font-semibold uppercase leading-none tracking-[-0.03em]",
            "text-[clamp(2.75rem,11.5dvh,7rem)]",
            pathname === menuLink.link ? "text-primary" : "text-white",
            "transition-opacity duration-300",
          ].join(" ")}
        >
          {menuLink.title}
        </motion.span>
      </span>
    </Link>
  );
};

const FullscreenMenu = ({ isOpen, setIsOpen, menuLinks, pathname }) => {
  const PANEL_TRANSITION = {
    duration: 1.2,
    ease: [0.77, 0, 0.175, 1],
  };
  const OPEN_REVEAL_DELAY = 0.55;
  const ITEM_STAGGER = 0.055;
  const LINE_LEAD = 0.16;
  const CLOSE_LINE_LAG = 0.12;
  const CLOSE_PANEL_OVERLAP = 0.4; // start panel close earlier before content fully finishes
  const itemCount = menuLinks.length;
  const closeTimerRef = useRef(null);

  const timings = useMemo(() => {
    const LINE_EXIT_DURATION = 0.9;
    const TEXT_EXIT_DURATION = 0.7;
    const ITEM_EXIT_STAGGER = 0.05;
    const CONTAINER_EXIT_STAGGER = 0.08;
    const SMALL_BUFFER = 0.05;

    const exitStaggerSpan = Math.max(0, itemCount - 1) * ITEM_STAGGER;
    const textExitTotal =
      exitStaggerSpan +
      TEXT_EXIT_DURATION +
      ITEM_EXIT_STAGGER +
      CONTAINER_EXIT_STAGGER +
      SMALL_BUFFER;
    const lineExitTotal =
      itemCount * ITEM_STAGGER + CLOSE_LINE_LAG + LINE_EXIT_DURATION;

    return {
      LINE_EXIT_DURATION,
      TEXT_EXIT_DURATION,
      contentExitTotal: Math.max(textExitTotal, lineExitTotal),
    };
  }, [itemCount, ITEM_STAGGER, CLOSE_LINE_LAG]);

  // Keep the panel mounted so we can play "reverse" exit animations
  // before the panel itself closes.
  const [renderPanel, setRenderPanel] = useState(isOpen);
  const [showContent, setShowContent] = useState(isOpen);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const hoverGateTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const effectiveHoverEnabled =
    !isMobile && hoverEnabled && isOpen && showContent;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (hoverGateTimerRef.current) {
      clearTimeout(hoverGateTimerRef.current);
      hoverGateTimerRef.current = null;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (isOpen) {
      setRenderPanel(true);
      setHoverEnabled(false);
      // Defer to next microtask to avoid enter animation being skipped
      // when rapidly toggling open/close.
      Promise.resolve().then(() => setShowContent(true));

      // Enable hover only after opening reveals have finished.
      const lastItemDelay = Math.max(0, itemCount - 1) * ITEM_STAGGER;
      const openTotal = OPEN_REVEAL_DELAY + LINE_LEAD + lastItemDelay + 0.65;
      hoverGateTimerRef.current = setTimeout(() => {
        hoverGateTimerRef.current = null;
        setHoverEnabled(true);
      }, openTotal * 1000);
      return;
    }
    // start reverse animations
    setShowContent(false);
    setHoverEnabled(false);

    // Close the panel slightly before the content fully finishes exiting.
    // This avoids a "pause" after text/lines disappear.
    const t =
      Math.max(0, timings.contentExitTotal - CLOSE_PANEL_OVERLAP) * 1000;
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setRenderPanel(false);
    }, t);
    return () => {
      if (hoverGateTimerRef.current) {
        clearTimeout(hoverGateTimerRef.current);
        hoverGateTimerRef.current = null;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, timings.contentExitTotal]);

  const line = {
    hidden: { scaleX: 0 },
    show: (i = 0) => ({
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: OPEN_REVEAL_DELAY + i * ITEM_STAGGER,
        ease: [0.77, 0, 0.175, 1],
      },
    }),
    exit: (i = 0) => ({
      scaleX: 0,
      transition: {
        duration: timings.LINE_EXIT_DURATION,
        delay: (itemCount - i) * ITEM_STAGGER + CLOSE_LINE_LAG,
        ease: [0.77, 0, 0.175, 1],
      },
    }),
  };

  const item = {
    hidden: {},
    show: (i = 0) => ({
      transition: {
        staggerChildren: 0.06,
        delayChildren: OPEN_REVEAL_DELAY + LINE_LEAD + i * ITEM_STAGGER,
      },
    }),
    exit: (i = 0) => ({
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: (itemCount - 1 - i) * ITEM_STAGGER,
      },
    }),
  };

  const revealUp = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: "110%",
      transition: {
        duration: timings.TEXT_EXIT_DURATION,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const footerReveal = {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: OPEN_REVEAL_DELAY + LINE_LEAD + 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 18,
      filter: "blur(10px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {renderPanel && [
        <motion.div
          key="fullscreen-menu-panel"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={PANEL_TRANSITION}
          className="fixed inset-0 z-40 flex h-dvh flex-col bg-black text-white"
        >
          {/* Links fill remaining viewport under the fixed navbar */}
          <div className="flex min-h-0 flex-1 flex-col pt-20 md:pt-24">
            <AnimatePresence
              onExitComplete={() => {
                if (!isOpen) setRenderPanel(false);
              }}
            >
              {showContent && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.15,
                      },
                    },
                    exit: { transition: { staggerChildren: 0.08 } },
                  }}
                  className="flex min-h-0 w-full flex-1 flex-col"
                >
                  <motion.div
                    variants={line}
                    custom={0}
                    style={{ originX: 0.5 }}
                    className="h-px w-full shrink-0 bg-white/20"
                  />
                  {menuLinks.map((menuLink, i) => (
                    <motion.div
                      key={menuLink.link}
                      variants={item}
                      custom={i}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <MenuRow
                        menuLink={menuLink}
                        i={i}
                        pathname={pathname}
                        revealUp={revealUp}
                        onClose={() => setIsOpen(false)}
                        hoverEnabled={effectiveHoverEnabled}
                      />
                      <motion.div
                        variants={line}
                        custom={i + 1}
                        style={{ originX: 0.5 }}
                        className="h-px w-full shrink-0 bg-white/20"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact footer — always visible, never eats Contact */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  variants={footerReveal}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="grid shrink-0 grid-cols-1 items-center gap-3 px-6 py-3 text-xs font-light md:grid-cols-3 md:gap-6 md:px-10 md:py-4 md:text-sm"
                >
                  {/* COPYRIGHT */}
                  <div className="opacity-60 order-3 text-center md:order-1 md:justify-self-start">
                    © 2026 All Rights Reserved
                  </div>

                  {/* SOCIAL ICONS — only when URLs exist */}
                  <div className="order-2 flex items-center justify-center gap-3 md:order-2">
                    {site.socialLinks?.length > 0
                      ? site.socialLinks.map((social) => (
                          <a
                            key={social.title}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.title}
                            className="group flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                          >
                            <span className="flex size-5 items-center justify-center">
                              <FaLinkedinIn />
                            </span>
                          </a>
                        ))
                      : null}
                  </div>

                  {/* EMAIL */}
                  <div className="order-1 flex flex-col items-center gap-2 md:order-3 md:flex-row md:justify-self-end md:gap-5">
                    <a href={`mailto:${site.email}`}>
                      <LinkHover
                        className="cursor-pointer opacity-60"
                        text={site.email}
                        arrowClassName="size-[17px]"
                      />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>,

        <motion.div
          key="fullscreen-menu-reveal-edge"
          aria-hidden
          initial={{ bottom: "100%" }}
          animate={{ bottom: "0%" }}
          exit={{ bottom: "100%" }}
          transition={PANEL_TRANSITION}
          className="pointer-events-none fixed left-0 z-41 h-px w-full bg-primary/50"
        />,
      ]}
    </AnimatePresence>
  );
};

export default FullscreenMenu;
