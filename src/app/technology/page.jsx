"use client";

import PageShell from "@/components/pages/PageShell";
import data from "@/data/technology.json";

export default function TechnologyPage() {
  return (
    <PageShell
      eyebrow={data.eyebrow}
      headline={data.headline}
      subheadline={data.subheadline}
      cta={data.cta}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {data.specs.map((row, i) => (
          <div
            key={row.label}
            className={`grid gap-4 px-6 py-8 md:grid-cols-[240px_1fr] md:px-10 ${
              i > 0 ? "border-t border-white/10" : ""
            }`}
          >
            <div className="text-xs uppercase tracking-widest text-primary">
              {row.label}
            </div>
            <div className="text-base leading-relaxed text-white/75 md:text-lg">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
