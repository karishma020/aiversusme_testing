"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Remove setVisible(currentScroll > 50) so it's always on screen
      setScrolled(currentScroll > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Feature", href: "#feature" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog-section" },
    { name: "Rankings", href: "/rankings" },
    { name: "Contact", href: "#contact" },
  ];

  const handleHashClick = (hash: string) => {
  if (hash === "#home") {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      // after navigation, scroll to top
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    }
    return;
  }

  if (pathname === "/") {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push(`/${hash}`);
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
};

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-500 ${
          visible ? "top-4 opacity-100" : "-top-20 opacity-0"
        } ${scrolled ? "scale-[0.98]" : "scale-100"}`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black shadow-md"
          } text-white`}
        >
          {/* LOGO */}
          {/* LOGO */}
          <div className="flex items-center gap-2">
           <img src="/bgremovedlogo.png" alt="logo" className="w-[120px] object-contain scale-150" />
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const isActive = pathname === link.href;

              if (isHash) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleHashClick(link.href)}
                    className="relative group text-gray-300 hover:text-white transition"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-300" />
                  </button>
                );
              }

              return (
                <Link key={link.name} href={link.href} className="relative group">
                  <span className={`transition ${isActive ? "text-white" : "text-gray-300"}`}>
                    {link.name}
                  </span>
                  <span className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* LOGIN BUTTON */}
          <div className="hidden md:block">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                  Login
                </button>
              </SignInButton>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black text-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 z-40 md:hidden">
          {navLinks.map((link) => {
            const isHash = link.href.startsWith("#");

            if (isHash) {
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    handleHashClick(link.href);
                    setMenuOpen(false);
                  }}
                  className="text-lg text-gray-300 hover:text-white"
                >
                  {link.name}
                </button>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-gray-300 hover:text-white"
              >
                {link.name}
              </Link>
            );
          })}

          {!isSignedIn ? (
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium">
              <SignInButton mode="modal">Login</SignInButton>
            </button>
          ) : (
            <div className="bg-white text-black px-3 py-2 rounded-full">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </>
  );
}