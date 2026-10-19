import LegalDocument from "@/components/pages/LegalDocument";
import terms from "@/data/terms.json";

export const metadata = {
  title: "Terms of Use | Mira Media",
  description: "Terms of Use for Mira Media (www.mira-media.co).",
};

export default function TermsPage() {
  return (
    <LegalDocument
      documents={[
        {
          id: "terms-of-use",
          document: terms,
          linkPrivacyInDocument: true,
        },
      ]}
    />
  );
}
