import PrivacyPolicy from "@/app/components/privacy";

export const metadata = {
  title: "Privacy Policy | AI Take My Job?",
  description: "Learn exactly how we collect, handle, and securely protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen pt-20">
      <PrivacyPolicy />
    </main>
  );
}
