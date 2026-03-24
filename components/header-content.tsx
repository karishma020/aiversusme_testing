"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface HeaderContentProps {
  userId: string | null;
}

export default function HeaderContent({ userId }: HeaderContentProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">AI Career Analyst</span>
        </Link>
        <nav className="flex items-center gap-6">
          {userId ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
                Dashboard
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4">
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
