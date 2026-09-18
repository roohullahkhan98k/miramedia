"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import DottedMap from "dotted-map";

export default function WorldMap({
  dots = [],
  lineColor = "#f4f7fb",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [active, setActive] = useState(null);

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40",
      shape: "circle",
      backgroundColor: "black",
    });
  }, []);

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const paths = useMemo(
    () =>
      dots.map((dot) => {
        const startPoint = projectPoint(dot.start.lat, dot.start.lng);
        const endPoint = projectPoint(dot.end.lat, dot.end.lng);
        return {
          d: createCurvedPath(startPoint, endPoint),
          start: startPoint,
          end: endPoint,
          startLabel: dot.start.label,
          endLabel: dot.end.label,
          label: dot.label,
        };
      }),
    [dots],
  );

  return (
    <div
      ref={ref}
      className="relative aspect-2/1 w-full rounded-lg bg-black font-sans"
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((path, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;
          return (
            <g
              key={`route-${i}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
              style={{ opacity: isDimmed ? 0.18 : 1 }}
            >
              {/* Fat invisible hit area */}
              <path
                d={path.d}
                fill="none"
                stroke="transparent"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <motion.path
                d={path.d}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  delay: 0.2 * i,
                  ease: "easeOut",
                }}
              />
              {inView && (
                <circle r={isActive ? 3.5 : 2.5} fill={lineColor} opacity="0.95">
                  <animateMotion
                    dur="2.6s"
                    begin={`${0.35 + i * 0.28}s`}
                    repeatCount="indefinite"
                    path={path.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur="2.6s"
                    begin={`${0.35 + i * 0.28}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {paths.map((path, i) => (
          <g key={`nodes-${i}`}>
            {[
              { point: path.start, label: path.startLabel },
              { point: path.end, label: path.endLabel },
            ].map(({ point, label }, j) => (
              <g
                key={`${i}-${j}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="10"
                  fill="transparent"
                />
                <circle cx={point.x} cy={point.y} r="2.5" fill={lineColor} />
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="2.5"
                  fill={lineColor}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={
                    inView
                      ? { opacity: [0.55, 0], scale: [1, 3.4] }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={{
                    duration: 1.7,
                    delay: 0.15 * i + j * 0.08,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                {active === i && label && (
                  <text
                    x={point.x}
                    y={point.y - 12}
                    textAnchor="middle"
                    className="fill-white text-[9px] font-medium tracking-wide"
                    style={{ fill: "#f4f7fb" }}
                  >
                    {label}
                  </text>
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>

      <AnimatePresence>
        {active !== null && paths[active] && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm"
          >
            {paths[active].label ||
              `${paths[active].startLabel} → ${paths[active].endLabel}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
