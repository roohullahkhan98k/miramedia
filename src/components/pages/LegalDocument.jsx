import Link from "next/link";

const LINK_BLUE = "text-[#3b82f6] underline-offset-2 hover:underline";

function linkify(text, { linkTermsOnce = false, linkPrivacy = false } = {}) {
  const tokens = [];
  const patterns = [];

  if (linkTermsOnce) {
    patterns.push({
      regex: /Terms of Use/,
      once: true,
      render: (match, key) => (
        <Link key={key} href="#terms-of-use" className={LINK_BLUE}>
          {match}
        </Link>
      ),
    });
  }

  if (linkPrivacy) {
    patterns.push({
      regex: /Privacy Policy/,
      once: true,
      render: (match, key) => (
        <Link key={key} href="/privacy" className={LINK_BLUE}>
          {match}
        </Link>
      ),
    });
  }

  patterns.push(
    {
      regex: /office@mira-media\.co/g,
      render: (match, key) => (
        <a key={key} href="mailto:office@mira-media.co" className={LINK_BLUE}>
          {match}
        </a>
      ),
    },
    {
      regex: /www\.mira-media\.co/g,
      render: (match, key) => (
        <a
          key={key}
          href="https://www.mira-media.co"
          className={LINK_BLUE}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match}
        </a>
      ),
    },
  );

  let remaining = text;
  let key = 0;
  const usedOnce = new Set();

  while (remaining.length > 0) {
    let earliest = null;

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      if (pattern.once && usedOnce.has(i)) continue;
      const flags = pattern.regex.flags.includes("g")
        ? pattern.regex.flags
        : `${pattern.regex.flags}g`;
      const re = new RegExp(pattern.regex.source, flags);
      re.lastIndex = 0;
      const match = re.exec(remaining);
      if (!match) continue;
      if (!earliest || match.index < earliest.index) {
        earliest = { index: match.index, match: match[0], pattern, patternIndex: i };
      }
    }

    if (!earliest) {
      tokens.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      tokens.push(remaining.slice(0, earliest.index));
    }
    tokens.push(earliest.pattern.render(earliest.match, key++));
    if (earliest.pattern.once) usedOnce.add(earliest.patternIndex);
    remaining = remaining.slice(earliest.index + earliest.match.length);
  }

  return tokens;
}

function Block({ block, linkTermsOnce, linkPrivacy }) {
  if (block.type === "p") {
    return (
      <p className="mb-5 text-[15px] leading-7 text-white/90 md:text-base md:leading-8">
        {linkify(block.text, { linkTermsOnce, linkPrivacy })}
      </p>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="mb-5 list-disc space-y-3 pl-6 text-[15px] leading-7 text-white/90 md:text-base md:leading-8">
        {block.items.map((item) => (
          <li key={item.slice(0, 64)}>{linkify(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ol") {
    return (
      <ol className="mb-5 list-decimal space-y-3 pl-6 text-[15px] leading-7 text-white/90 md:text-base md:leading-8">
        {block.items.map((item, index) => (
          <li key={`${index}-${item.slice(0, 32)}`}>{linkify(item)}</li>
        ))}
      </ol>
    );
  }

  return null;
}

export function LegalSections({
  document,
  id,
  linkTermsInFirstParagraph = false,
  linkPrivacyInDocument = false,
}) {
  let termsLinked = false;
  let privacyLinked = false;

  return (
    <article id={id} className="scroll-mt-28">
      <h1 className="mb-10 font-poppins text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {document.title}
      </h1>

      {document.sections.map((section) => (
        <section key={section.heading} className="mb-12 md:mb-14">
          <h2 className="mb-5 font-poppins text-xl font-semibold uppercase tracking-wide text-white md:text-2xl">
            {section.heading}
          </h2>
          {section.blocks.map((block, index) => {
            const shouldLinkTerms =
              linkTermsInFirstParagraph &&
              !termsLinked &&
              block.type === "p" &&
              block.text.includes("Terms of Use");
            if (shouldLinkTerms) termsLinked = true;

            const shouldLinkPrivacy =
              linkPrivacyInDocument &&
              !privacyLinked &&
              block.type === "p" &&
              block.text.includes("Privacy Policy");
            if (shouldLinkPrivacy) privacyLinked = true;

            return (
              <Block
                key={`${section.heading}-${index}`}
                block={block}
                linkTermsOnce={shouldLinkTerms}
                linkPrivacy={shouldLinkPrivacy}
              />
            );
          })}
        </section>
      ))}
    </article>
  );
}

export default function LegalDocument({ documents }) {
  return (
    <main className="relative min-h-dvh bg-black text-white">
      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        {documents.map((doc, index) => (
          <div
            key={doc.id}
            className={
              index > 0
                ? "mt-20 border-t border-white/15 pt-20 md:mt-28 md:pt-28"
                : ""
            }
          >
            <LegalSections
              document={doc.document}
              id={doc.id}
              linkTermsInFirstParagraph={doc.linkTermsInFirstParagraph}
              linkPrivacyInDocument={doc.linkPrivacyInDocument}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
