"use client";

import { motion, stagger, useAnimate } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function FirstBlock({
  firstFont,
  secondFont,
}: {
  firstFont: NextFont;
  secondFont: NextFont;
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
    xPercent += 0.1 * direction;
  };
  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const onButtonClick = () => {
    animate([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      [".letter", { y: 0 }, { duration: 0.000001, at: "<" }],
    ]);
    const link = document.createElement("a");
    link.href = "/Oleg Labunin CV.pdf";
    link.download = "Oleg Labunin CV.pdf";
    link.click();
  };
  return (
    <motion.section
      className={`flex flex-col items-center justify-center min-h-screen p-10 overflow-hidden ${firstFont.className}`}
    >
      <div className="w-full h-1/2 text-6xl md:text-9xl flex flex-col justify-start items-start ">
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
                className="inline-block letter py-4"
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
      <div className={`${secondFont.className} self-start`}>
        <div className={`relative whitespace-nowrap`}>
          <p
            ref={firstText}
            className="relative m-0 text-[50px] md:text-[100px] pr-[50px]"
          >
            Frontend developer Frontend developer{" "}
          </p>
          <p
            ref={secondText}
            className="absolute m-0 text-[50px] md:text-[100px] pr-[50px] left-full top-0"
          >
            Frontend developer Frontend developer{" "}
          </p>
        </div>
      </div>
      <div ref={scope} className="py-10">
        <motion.button
          onClick={onButtonClick}
          whileTap={{ scale: 0.8 }}
          className={`rounded-full border px-6 py-2 transition-colors hover:bg-blue-100 ${secondFont.className}`}
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
