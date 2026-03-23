import RankingsClient from "./rankings-client";

export default function RankingPage() {
  // ✅ Generate dataset safely
  const jobsData = Array.from({ length: 50 }, (_, i) => {
    const titles = [
      "AI Engineer",
      "Data Scientist",
      "Cybersecurity Analyst",
      "Cloud Engineer",
      "Full Stack Developer",
      "DevOps Engineer",
      "UI/UX Designer",
      "Product Manager",
      "Blockchain Developer",
      "Digital Marketing Manager",
    ];

    return {
      id: i + 1,
      title: titles[i % titles.length],
      salary: 600000 + ((i * 137) % 1500000),
      risk: 5 + ((i * 17) % 40),
      score: 70 + ((i * 23) % 30),
      category: ["IT", "Design", "Marketing", "Management"][i % 4],
    };
  });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ✅ Always pass jobsData */}
      <RankingsClient jobsData={jobsData} />
    </main>
  );
}