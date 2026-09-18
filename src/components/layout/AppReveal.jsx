"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "@/components/layout/Splash/SplashScreen";
import { SplashProvider } from "@/components/layout/Splash/SplashContext";

const SPLASH_REVEAL_LEAD_IN = 300;

export default function AppReveal({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (showSplash) return undefined;

    const timer = setTimeout(() => {
      setSplashDone(true);
    }, SPLASH_REVEAL_LEAD_IN);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <SplashProvider value={{ splashDone }}>
      {children}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            key="app-splash"
            onComplete={() => {
              setShowSplash(false);
            }}
          />
        )}
      </AnimatePresence>
    </SplashProvider>
  );
}
