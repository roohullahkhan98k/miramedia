"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useSplash } from "@/components/layout/Splash/SplashContext";
import data from "@/data/contact.json";

const MeshBackground = dynamic(
  () => import("@/components/common/MeshBackground"),
  { ssr: false },
);

const inputStyles =
  "w-full border-b border-white/20 bg-transparent py-5 font-poppins text-base text-white outline-none transition-colors duration-300 placeholder:text-white/35 hover:border-white/35 focus:border-primary";

function ContactForm() {
  const { splashDone } = useSplash();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "demand" ? "demand" : "supply";
  const [role, setRole] = useState(initialRole);
  const [integrations, setIntegrations] = useState([]);

  const mailto = useMemo(() => `mailto:${data.email}`, []);

  const toggleIntegration = (value) => {
    setIntegrations((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <div className="grid gap-20 lg:grid-cols-2 lg:gap-24 xl:gap-32">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col justify-between gap-20"
      >
        <div>
          <p className="mb-10 font-poppins text-xs uppercase tracking-widest text-primary">
            {data.eyebrow} / 01
          </p>

          <h1 className="font-krisha text-6xl leading-none uppercase sm:text-7xl lg:text-8xl">
            {data.headline}
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
            {data.subheadline}
          </p>
        </div>

        <div className="border-t border-white/20 pt-6 font-poppins">
          <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
            Email
          </p>
          <a
            href={mailto}
            className="group inline-flex items-center gap-2 text-sm text-white transition-colors duration-300 hover:text-primary"
          >
            {data.email}
            <span className="text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              ↗
            </span>
          </a>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.8,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center lg:py-10"
      >
        <div className="w-full">
          <div className="mb-10 flex items-end justify-between border-b border-white/20 pb-6">
            <div>
              <p className="mb-3 font-poppins text-xs uppercase tracking-widest text-white/35">
                Partnership inquiry
              </p>
              <h2 className="max-w-sm text-2xl font-medium tracking-tight">
                Tell us about your supply or demand.
              </h2>
            </div>
          </div>

          <form
            className="font-poppins"
            action={mailto}
            method="post"
            encType="text/plain"
          >
            <div className="mb-8">
              <p className="mb-4 text-xs uppercase tracking-widest text-white/35">
                Partner Role
              </p>
              <div className="flex flex-wrap gap-3">
                {data.roles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                      role === item.id
                        ? "bg-primary text-black"
                        : "border border-white/20 text-white/70 hover:border-white/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="partner-role" value={role} />
            </div>

            <div className="grid gap-x-6 md:grid-cols-2">
              <label className="block">
                <span className="sr-only">Full name</span>
                <input
                  className={inputStyles}
                  type="text"
                  name="name"
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="block">
                <span className="sr-only">Work email</span>
                <input
                  className={inputStyles}
                  type="email"
                  name="email"
                  placeholder="Work email"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <div className="grid gap-x-6 md:grid-cols-2">
              <label className="block">
                <span className="sr-only">Company name</span>
                <input
                  className={inputStyles}
                  type="text"
                  name="company"
                  placeholder="Company name"
                  required
                />
              </label>

              <label className="block">
                <span className="sr-only">Website URL</span>
                <input
                  className={inputStyles}
                  type="url"
                  name="website"
                  placeholder="Website URL"
                />
              </label>
            </div>

            <div className="border-b border-white/20 py-6">
              <p className="mb-4 text-xs uppercase tracking-widest text-white/35">
                Technical Integration
              </p>
              <div className="flex flex-wrap gap-2">
                {data.integrationTypes.map((type) => {
                  const active = integrations.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleIntegration(type)}
                      className={`rounded-full px-3 py-2 text-xs uppercase tracking-wide ${
                        active
                          ? "bg-primary text-black"
                          : "border border-white/15 text-white/55"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              <input
                type="hidden"
                name="integrations"
                value={integrations.join(", ")}
              />
            </div>

            <label className="block">
              <span className="sr-only">Monthly volume</span>
              <select
                className={`${inputStyles} appearance-none`}
                name="volume"
                defaultValue=""
                required
              >
                <option value="" disabled className="bg-black">
                  Monthly impression volume
                </option>
                {data.volumeOptions.map((option) => (
                  <option key={option} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Message / Target GEOs</span>
              <textarea
                className={`${inputStyles} min-h-40 resize-none leading-relaxed`}
                name="message"
                placeholder="Message / target GEOs"
                required
              />
            </label>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-white/35">
                {role === "supply"
                  ? "We'll follow up on supply onboarding and endpoint setup."
                  : "We'll follow up with DSP endpoint and inventory details."}
              </p>

              <button
                type="submit"
                className="group flex min-h-14 w-full items-center justify-between gap-6 bg-primary py-2 pl-6 pr-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-primary-light sm:w-auto"
              >
                <span>Submit Integration Request</span>
                <span className="flex size-10 items-center justify-center bg-black text-lg text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative min-h-dvh bg-black text-white">
      <MeshBackground />
      <div className="relative z-10 px-3 pb-20 pt-32 md:px-8 md:pb-24 md:pt-40">
        <Suspense fallback={<div className="min-h-96" />}>
          <ContactForm />
        </Suspense>
      </div>
    </main>
  );
}
