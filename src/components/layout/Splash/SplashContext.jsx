"use client";

import { createContext, useContext } from "react";

const SplashContext = createContext({
  splashDone: false,
});

export function SplashProvider({ value, children }) {
  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  );
}

export function useSplash() {
  return useContext(SplashContext);
}
