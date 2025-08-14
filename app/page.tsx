"use client";

import React, { useEffect, useState } from "react";
import {
  // Quicksand,
  Passion_One,
  Syncopate,
  Inter,
  Victor_Mono,
} from "next/font/google";
import WelcomePage from "./pages/welcomePage";
import FirstBlock from "./pages/firstBlock";
import Header from "./pages/header";
import Contact from "./pages/contact";
import AgentPage from "./pages/agent";

// const quicksand = Quicksand({ subsets: ["latin"], weight: "400" });
const passion = Passion_One({ subsets: ["latin"], weight: "400" });
const syncopate = Syncopate({ subsets: ["latin"], weight: "400" });
const interBold = Inter({ subsets: ["latin"], weight: "900" });
const victorMono = Victor_Mono({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [showWelcomePage, setShowWelcomePage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomePage(false);
    }, 7000);
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#0f172a]  text-[#f8fafc]" : "bg-[#f8fafc] text-[#94a3b8]"
      } ${syncopate.className}`}
    >
      {showWelcomePage && <WelcomePage font={passion} />}
      {!showWelcomePage && (
        <>
          <Header font={syncopate} isDark={isDark} setIsDark={setIsDark} />
          <FirstBlock
            firstFont={interBold}
            secondFont={victorMono}
            isDark={isDark}
          />
          <Contact secondFont={victorMono} isDark={isDark} />
        </>
      )}
    </main>
  );
}
