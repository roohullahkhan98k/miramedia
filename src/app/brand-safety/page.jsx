"use client";

import PageShell from "@/components/pages/PageShell";
import data from "@/data/brandSafety.json";

export default function BrandSafetyPage() {
  return (
    <PageShell
      eyebrow={data.eyebrow}
      headline={data.headline}
      subheadline={data.subheadline}
      cta={data.cta}
    >
      <div className="grid gap-10 md:grid-cols-3">
        {data.sections.map((section, i) => (
          <article
            key={section.title}
            className="border-t border-white/15 pt-6"
          >
            <div className="mb-4 text-xs tracking-widest text-primary">
              / {String(i + 1).padStart(2, "0")}
            </div>
            <h2 className="mb-4 font-krisha text-2xl uppercase leading-none md:text-3xl">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-white/60 md:text-base">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3 border-t border-white/10 pt-10">
        {data.trustPartners.map((name) => (
          <span
            key={name}
            className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-widest text-primary"
          >
            {name}
          </span>
        ))}
      </div>
    </PageShell>
  );
}
