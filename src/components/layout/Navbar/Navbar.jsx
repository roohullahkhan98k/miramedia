"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { DoubleText } from "@/components/common";
import FullscreenMenu from "./FullscreenMenu";
import { LinkHover } from "@/components/ui";
import NavLogo from "./NavLogo";
import { useSplash } from "@/components/layout/Splash/SplashContext";
import site from "@/data/site.json";

const Navbar = () => {
  const menuLinks = site.nav;
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { splashDone } = useSplash();
  const [isSwitched, setIsSwitched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSwitched(window.scrollY >= 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="w-full px-3 md:px-8 h-20 md:h-24 fixed top-0 left-0 flex justify-between items-center gap-2 text-sm font-light text-white z-50 bg-linear-to-b from-black to-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <NavLogo
          isSwitched={isSwitched || isOpen || !isHomePage}
          setIsOpen={setIsOpen}
        />
        <div className="flex items-center gap-3 md:gap-14">
          <div className="flex items-center gap-3">
            <Link
              className="hidden md:flex cursor-pointer gap-2 items-center bg-neutral-900 rounded-lg px-3 py-2 group"
              href="/contact"
              onClick={() => setIsOpen(false)}
            >
              <LinkHover
                className="h-max text-primary"
                text={site.navCta}
                arrowClassName="size-[17px]"
                underline={false}
              />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex gap-2 items-center bg-neutral-900 rounded-lg px-3 py-2"
            >
              <DoubleText text1="Menu" text2="Close" isSwitched={isOpen} />
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span
                  className={`absolute h-px bg-white transition-all duration-300 ease-in-out ${
                    isOpen ? "w-4 rotate-45" : "w-5 -translate-y-0.75"
                  }`}
                />
                <span
                  className={`absolute h-px bg-white transition-all duration-300 ease-in-out ${
                    isOpen ? "w-4 -rotate-45" : "w-5 translate-y-0.75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
      <FullscreenMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuLinks={menuLinks}
        pathname={pathname}
      />
    </>
  );
};

export default Navbar;
