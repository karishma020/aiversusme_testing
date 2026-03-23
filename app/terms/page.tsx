import TermsAndCondition from "@/app/components/termsncondition";

export const metadata = {
  title: "Terms & Conditions | AI Take My Job?",
  description: "Read the legal terms for using our platform.",
};

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen pt-20">
      <TermsAndCondition />
    </main>
  );
}
