"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "motion/react";
import * as THREE from "three";
import { useSplash } from "@/components/layout/Splash/SplashContext";

// ─── config ────────────────────────────────────────────────────────────────
const U_LINES = 115;
const STEPS = 260;

const WIDTH = 80;
const HEIGHT = 58;

const RADIUS = 6.5;
const STRENGTH = 0.35;
const SPRING = 0.028;
const DAMPING = 0.76;
const RADIUS_SQ = RADIUS * RADIUS;

// pre-allocated temps — reused every frame, zero GC
const _tx = new Float32Array(STEPS);
const _ty = new Float32Array(STEPS);

const TOTAL_VERTS = U_LINES * (STEPS - 1) * 2;
const TOTAL_PHYSICS = U_LINES * STEPS;

const CAM_POS = [0, 0, 20];
const CAM_TARGET = new THREE.Vector3(0, 0, 0);

function FoldGrid({ mouseRef }) {
  const smooth = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);
  const offsets = useRef(new Float32Array(TOTAL_PHYSICS));
  const velocities = useRef(new Float32Array(TOTAL_PHYSICS));

  const { viewport } = useThree();

  const posArr = useMemo(() => new Float32Array(TOTAL_VERTS * 3), []);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    return geo;
  }, [posArr]);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;

    if (mouseRef?.current) {
      smooth.current.x += (mouseRef.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouseRef.current.y - smooth.current.y) * 0.12;
    }

    const cursorX = smooth.current.x * viewport.width * 0.5;
    const cursorY = smooth.current.y * viewport.height * 0.5;
    const isMoving = !!mouseRef.current?.moving;

    // cache typed array refs to locals — avoids repeated .current lookups
    const offs = offsets.current;
    const vels = velocities.current;

    let vi = 0;

    for (let i = 0; i < U_LINES; i++) {
      const u = i / (U_LINES - 1);

      // ── hoist u-and-t constants out of the inner loop ─────────────────
      // Each sine arg = (u·πA + v·πB ± t·C). The u-t part is fixed per line.
      const baseXLinear = (u - 0.5) * WIDTH;
      const pha1 = u * Math.PI * 4 - t * 0.28;
      const pha2 = u * Math.PI * 2.6 + t * 0.18;
      const pha3 = u * Math.PI * 6 - t * 0.42;

      for (let j = 0; j < STEPS; j++) {
        const v = j / (STEPS - 1);
        const idx = i * STEPS + j;

        // inline surface — eliminates function call + temp array alloc per vertex
        const fold =
          4.8 * Math.sin(pha1 + v * Math.PI * 2.2) +
          2.0 * Math.sin(pha2 - v * Math.PI * 1.6) +
          0.8 * Math.sin(pha3 + v * Math.PI * 0.9);

        const baseX = baseXLinear + fold;
        const baseY = (v - 0.5) * HEIGHT;

        // ── cursor physics ───────────────────────────────────────────────
        let off = offs[idx];
        let vel = vels[idx];

        if (isMoving) {
          const dx = baseX + off - cursorX;
          const dy = baseY - cursorY;
          const distSq = dx * dx + dy * dy;

          if (distSq < RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / RADIUS;
            vel += falloff * falloff * STRENGTH * (dx / (dist + 0.001));
          }
        }

        // spring — skip entirely when vertex is already at rest
        // (saves ~29k updates/frame when mouse has been still for a moment)
        if (off !== 0 || vel !== 0) {
          vel = (vel - off * SPRING) * DAMPING;
          off += vel;
          // snap to zero to let the at-rest skip kick in next frame
          if (Math.abs(off) < 0.0005 && Math.abs(vel) < 0.0003) {
            off = 0;
            vel = 0;
          }
          offs[idx] = off;
          vels[idx] = vel;
        }

        _tx[j] = baseX + off;
        _ty[j] = baseY;
      }

      // ── write vertex pairs ─────────────────────────────────────────────
      for (let j = 1; j < STEPS; j++) {
        posArr[vi++] = _tx[j - 1];
        posArr[vi++] = _ty[j - 1];
        posArr[vi++] = 0;
        posArr[vi++] = _tx[j];
        posArr[vi++] = _ty[j];
        posArr[vi++] = 0;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[-0.18, 0, 0]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#9aa8b8" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function MeshBackground() {
  const mouseRef = useRef({ x: 0, y: 0, moving: false });
  const { splashDone } = useSplash();

  useEffect(() => {
    // Disable all mouse-driven interactions on mobile widths (also works in DevTools emulation).
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
      mouseRef.current.moving = false;
      return;
    }

    let stopTimer;
    const fn = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.moving = true;
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        mouseRef.current.moving = false;
      }, 80);
    };
    window.addEventListener("mousemove", fn);
    return () => {
      window.removeEventListener("mousemove", fn);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={splashDone ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
    >
      <Canvas
        camera={{ position: CAM_POS, fov: 80 }}
        gl={{ antialias: true, alpha: false }}
        dpr={1}
      >
        <color attach="background" args={["#000000"]} />
        <FoldGrid mouseRef={mouseRef} />
      </Canvas>
    </motion.div>
  );
}
