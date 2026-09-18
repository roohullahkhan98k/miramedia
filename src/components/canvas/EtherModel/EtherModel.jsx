"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, Clone, useGLTF } from "@react-three/drei";

// Base rotation (desktop)
const BASE_RX = -0.365;
const BASE_RY = 0.358;
const BASE_RZ = 0.15;

// Base rotation (mobile)
const MOBILE_BASE_RX = -0.502;
const MOBILE_BASE_RY = 0.488;
const MOBILE_BASE_RZ = 0.15;

export default function EtherModel({ mouseRef, spinProgress, splashDone }) {
  const groupRef = useRef();
  const modelRef = useRef();
  const smoothRot = useRef({ x: 0, y: 0 });
  const introStartRef = useRef(null);
  const { viewport, size } = useThree();

  const { scene } = useGLTF("/models/Ether3d.glb");

  const material = useMemo(
    () => (
      <meshStandardMaterial
        color="#777777"
        roughness={0.12}
        metalness={1}
        envMapIntensity={1.5}
      />
    ),
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    if (!splashDone) {
      introStartRef.current = null;
      if (modelRef.current) {
        modelRef.current.scale.setScalar(0);
      }
      return;
    }

    if (introStartRef.current === null) introStartRef.current = t;
    const DELAY = 0.8;
    const DURATION = 1.25;
    const elapsed = t - introStartRef.current;
    const introT =
      elapsed <= DELAY ? 0 : Math.min(1, (elapsed - DELAY) / DURATION);
    const intro = introT === 1 ? 1 : 1 - Math.pow(2, -10 * introT);

    // Spin across the *entire* pinned scroll (0 → 1).
    const scrollRaw = spinProgress?.get?.() ?? 0;
    const phase = Math.max(0, Math.min(1, scrollRaw));
    const scrollEase = phase * phase * (3 - 2 * phase);

    if (mouseRef?.current) {
      // Increase tilt as the logo scales down / scrolls,
      // so the effect stays readable even while spinning.
      const tiltBoost = 1 + 1.6 * scrollEase;
      smoothRot.current.x +=
        (mouseRef.current.y * 0.14 * tiltBoost - smoothRot.current.x) * 0.04;
      smoothRot.current.y +=
        (mouseRef.current.x * 0.18 * tiltBoost - smoothRot.current.y) * 0.04;
    }

    // Ease the spin so it naturally decelerates near the end of the pin.
    // (Linear spin looks like a hard stop when progress clamps at 1.)
    const spin = scrollEase * Math.PI * 2.18; // a bit more than 1 full turn
    // By the end of the scroll, we "straighten" (remove base + mouse tilt).
    // Spin still completes 360° (2π), which is visually equivalent to 0.
    const straighten = 1 - scrollEase;

    const isMobile = (size?.width ?? 9999) < 768;
    const baseRx = isMobile ? MOBILE_BASE_RX : BASE_RX;
    const baseRy = isMobile ? MOBILE_BASE_RY : BASE_RY;
    const baseRz = isMobile ? MOBILE_BASE_RZ : BASE_RZ;

    groupRef.current.rotation.x = (baseRx + smoothRot.current.x) * straighten;
    // Add a subtle extra "final settle" yaw near the end.
    const endT = Math.max(0, Math.min(1, (phase - 0.88) / 0.12));
    const endEase = endT * endT * (3 - 2 * endT);
    const finalYaw = endEase * 0.28;

    groupRef.current.rotation.y =
      spin + (baseRy + smoothRot.current.y) * straighten + finalYaw;
    groupRef.current.rotation.z = baseRz * straighten;
    // Mobile starts lower in the viewport (closer to ~60–70% from top).
    const baseYLower = -viewport.height * (isMobile ? 0.38 : 0.3);
    const baseY = baseYLower * (1 - scrollEase);
    const enterOffset = viewport.height * 0.12 * (1 - intro);
    const floatAmp = 0.9 * intro;

    groupRef.current.position.y =
      baseY - enterOffset + Math.sin(t * 0.7) * floatAmp;
    // ease X offset out by end of scroll
    groupRef.current.position.x = viewport.width * 0.03 * (1 - scrollEase);

    if (modelRef.current) {
      if (elapsed <= DELAY) {
        modelRef.current.scale.setScalar(0);
        return;
      }
      const baseScale = Math.min(viewport.width, viewport.height) * 0.342;
      const introScale = 0.5 + 0.5 * intro;
      // Slightly less shrink by end-of-scroll (bigger final size).
      const scrollScale = 1 - 0.2 * scrollEase;
      const s = baseScale * introScale * scrollScale;
      modelRef.current.scale.setScalar(s);

      // Fade out only at the very end of the scroll.
      // Start a touch earlier for a longer fade.
      const fadeT = Math.max(0, Math.min(1, (phase - 0.84) / 0.16));
      const fadeEase = fadeT * fadeT * (3 - 2 * fadeT);
      const opacity = 1 - fadeEase;
      modelRef.current.traverse((obj) => {
        if (!obj.material) return;
        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        for (const m of mats) {
          if (!m) continue;
          m.transparent = true;
          m.depthWrite = opacity >= 1; // avoid odd depth artifacts while fading
          if ("opacity" in m) m.opacity = opacity;
          m.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <group ref={modelRef} scale={0}>
          <Clone object={scene} inject={material} />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload("/models/Ether3d.glb");
