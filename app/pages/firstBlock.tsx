"use client";

import { motion, stagger, useAnimate } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function FirstBlock({
  firstFont,
  secondFont,
  isDark,
}: {
  firstFont: NextFont;
  secondFont: NextFont;
  isDark: boolean;
}) {
  const [scope, animate] = useAnimate();

  const firstText = useRef<HTMLDivElement>(null);
  const secondText = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  const direction = -1;

  const animation = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animation);
    xPercent += 0.05 * direction;
  };
  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const handleHover = () => {
    animate([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      [".letter", { y: 0 }, { duration: 0.000001, at: "<" }],
    ]);
  };

  const onButtonClick = () => {
    animate([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      [".letter", { y: 0 }, { duration: 0.000001, at: "<" }],
    ]);
    const link = document.createElement("a");
    link.href =
      "https://drive.google.com/file/d/1G-rlwAVgCrNUQnvM-tRErdsZXNPW5SLr/view?usp=sharing";

    link.target = "_blank";
    link.click();
  };
  return (
    <motion.section
      className={`flex flex-col items-start justify-center min-h-screen p-10 overflow-hidden ${firstFont.className}`}
    >
      <h3 className={`${secondFont.className} text-sm mt-10`}>
        Hi, my name is
      </h3>
      <div
        className={`w-full h-1/2 text-4xl md:text-6xl ${
          isDark ? "text-[#38bdf8]" : "text-[#0284c7]"
        } flex flex-col justify-start items-start`}
      >
        {"Oleg Labunin".split(" ").map((word, wordIndex) => (
          <motion.div
            key={wordIndex}
            className="inline-block mr-2 overflow-hidden"
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{
              delay: wordIndex * 0.1,
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            {word.split("").map((letter, index) => (
              <motion.span
                key={index}
                className={`inline-block letter py-2`}
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
      <p className={`${secondFont.className} text-sm my-2 w-full md:w-2/3`}>
        I&apos;m Frontend Developer with{" "}
        <span className="text-[#38bdf8]">4+ years</span> of expertise in
        building enterprise applications using{" "}
        <span className="text-[#38bdf8]">React</span>,{" "}
        <span className="text-[#38bdf8]">Next.js</span> and{" "}
        <span className="text-[#38bdf8]">TypeScript</span>. Proficient in the
        full development cycle, from architectural design to final release.
      </p>
      <div className={`${secondFont.className} self-start py-10 md:py-5`}>
        <div className={`relative whitespace-nowrap`}>
          <p
            ref={firstText}
            className="relative m-0 text-3xl md:text-4xl pr-10"
          >
            Frontend developer React NextJS TypeScript Frontend developer React
            NextJS TypeScript{" "}
          </p>
          <p
            ref={secondText}
            className="absolute m-0 text-3xl md:text-4xl pr-10 left-full top-0"
          >
            Frontend developer React NextJS TypeScript Frontend developer React
            NextJS TypeScript{" "}
          </p>
        </div>
      </div>
      <div ref={scope} className="py-2 self-center">
        <motion.button
          onClick={onButtonClick}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleHover()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-full border px-6 py-2 cursor-pointer ${secondFont.className}`}
        >
          <span className="sr-only">Download CV</span>
          <span className="block h-8 overflow-hidden" aria-hidden>
            {["D", "O", "W", "N", "L", "O", "A", "D", " _", "C", "V"].map(
              (letter, index) => (
                <motion.span
                  data-letter={letter}
                  className="letter inline-block relative h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {letter}
                </motion.span>
              )
            )}
          </span>
        </motion.button>
      </div>
    </motion.section>
  );
}
