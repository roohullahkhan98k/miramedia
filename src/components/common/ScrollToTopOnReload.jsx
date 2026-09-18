"use client";

import { useLayoutEffect } from "react";
import { useLenis } from "@/utils/lenis";

export default function ScrollToTopOnReload() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return null;
}
