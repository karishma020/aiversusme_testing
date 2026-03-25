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
  title: " AI vs ME ",
  description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

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
        <head>
  <link rel="icon" type="image/png" href="/bgremovedlogo.png" />
  <link rel="apple-touch-icon" href="/bgremovedlogo.png" />
</head>
        <body className="min-h-full flex flex-col">
          <Header userId={userId} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}