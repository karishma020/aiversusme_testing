"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">

      {/* INNER CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* LEFT - BRAND */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/bgremovedlogo.png" alt="logo" height={200} width={200} />
            </div>
            <p className="text-gray-400 text-sm">
              Discover how AI will impact your career. Analyze job risks,
              explore rankings, and future-proof your skills.
            </p>
          </div>

          {/* CENTER - LINKS */}
          <div className="flex flex-col md:flex-row gap-10 text-sm">

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Product</span>
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/#about" className="hover:text-gray-300">About</Link>
              <Link href="/rankings" className="hover:text-gray-300">Rankings</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Company</span>
              <Link href="#" className="hover:text-gray-300">Careers</Link>
              <Link href="/#blog-section" className="hover:text-gray-300">Blog</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Legal</span>
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            </div>

          </div>

          {/* RIGHT - SOCIAL */}
          <div className="flex flex-col gap-4">
            <span className="text-gray-400 uppercase text-xs">Follow</span>
            <div className="flex gap-4">
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
                <FaGithub size={16} />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} AI Job Risk. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* MOVING DISCLAIMER - loops forever */}
      <div className="w-full border-t border-white/10 bg-white/5 py-3 overflow-hidden">
        <style>{`
          @keyframes scroll-loop {
            0%   { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .disclaimer-loop {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-loop 20s linear infinite;
          }
        `}</style>
        <p className="disclaimer-loop text-sm font-medium text-yellow-400">
          ⚠️&nbsp;&nbsp;All insights provided are AI-generated and for informational purposes only; please verify independently before making career decisions.
        </p>
      </div>

    </footer>
  );
}