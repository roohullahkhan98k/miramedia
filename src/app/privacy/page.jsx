import LegalDocument from "@/components/pages/LegalDocument";
import privacy from "@/data/privacy.json";
import terms from "@/data/terms.json";

export const metadata = {
  title: "Privacy Policy | Mira Media",
  description:
    "Privacy Policy and Terms of Use for Mira Media (www.mira-media.co).",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      documents={[
        {
          id: "privacy-policy",
          document: privacy,
          linkTermsInFirstParagraph: true,
        },
        {
          id: "terms-of-use",
          document: terms,
          linkPrivacyInDocument: true,
        },
      ]}
    />
  );
}
