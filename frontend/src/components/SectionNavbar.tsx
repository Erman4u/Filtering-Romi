"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { id: "hero", label: "Beranda" },
  { id: "latar-belakang", label: "Latar Belakang" },
  { id: "algoritma", label: "Algoritma" },
  { id: "evaluasi", label: "Evaluasi" },
];

export default function SectionNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter text-black uppercase">
          KING <span className="text-blue-600">ROMI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-xs font-bold uppercase tracking-widest text-black/40 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link 
          href="/recommend"
          className="bg-black text-white text-[10px] font-bold uppercase px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all active:scale-95"
        >
          Coba Sekarang
        </Link>
      </div>
    </motion.nav>
  );
}
