import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/header";
import Footer from "@/app/components/footer";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "AI VS ME",
  description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills.",
   
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning={true}
        className={cn(
          "h-full antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <body className="min-h-full flex flex-col">
          <Header userId={userId} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
