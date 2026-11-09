"use client";

import { useState } from "react";
import { Syncopate, Inter, Victor_Mono } from "next/font/google";
import FirstBlock from "./pages/firstBlock";
import Header from "./pages/header";
import Contact from "./pages/contact";
import CreateSite from "./pages/createSite";

const syncopate = Syncopate({ subsets: ["latin"], weight: "400" });
const interBold = Inter({ subsets: ["latin"], weight: "900" });
const victorMono = Victor_Mono({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [fallbackNote, setFallbackNote] = useState<string | null>(null);

  if (!fallbackNote) {
    return <CreateSite onFallback={setFallbackNote} />;
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#0f172a]  text-[#f8fafc]" : "bg-[#f8fafc] text-[#94a3b8]"
      } ${syncopate.className}`}
    >
      <Header font={syncopate} isDark={isDark} setIsDark={setIsDark} />
      <p
        role="status"
        className="relative z-[70] mx-auto mt-16 max-w-xl rounded-md bg-[#111] px-3 py-2 text-center font-sans text-xs text-white shadow-lg"
      >
        {fallbackNote}
      </p>
      <FirstBlock
        firstFont={interBold}
        secondFont={victorMono}
        isDark={isDark}
      />
      <Contact secondFont={victorMono} isDark={isDark} />
    </main>
  );
}
