import { motion, stagger, useAnimate, useAnimation } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import { useEffect } from "react";

export default function WelcomePage({ font }: { font: NextFont }) {
  const controls = useAnimation();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    controls.start("visible").then(() => {
      controls.start("moveApp");
    });
  }, [controls]);

  const onButtonClick = () => {
    animate([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      //   [".button", { scale: 0.8 }, { duration: 0.2, at: "<" }],
      //   [".button", { scale: 1 }, { duration: 0.2 }],
      [".letter", { y: 0 }, { duration: 0.000001, at: "<" }],
    ]);
  };
  return (
    <main className="h-screen relative">
      <motion.section
        className="flex items-left justify-center overflow-hidden h-3/4 p-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          visible: {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 3, ease: "easeInOut" },
          },
          moveApp: {},
        }}
      >
        <div className="relative">
          <motion.div
            variants={{
              moveApp: { y: 0 },
            }}
            className={`text-7xl md:text-9xl font-bold text-[#005670] ${font.className}`}
          >
            FRONTEND
          </motion.div>
          <motion.div
            variants={{
              moveApp: {
                position: "absolute",
                y: "200%",
                top: "30%",
                transition: { duration: 2 },
              },
            }}
            className={`text-7xl md:text-9xl font-bold text-[#005670] ${font.className}`}
          >
            DEVELOPER
          </motion.div>
        </div>
      </motion.section>
      <motion.div className="flex items-center justify-center gap-4 p-10 h-1/4">
        <motion.button className="group rounded-[100px] flex flex-row items-center justify-center transition-all duration-75 py-[12px] gap-[16px] w-max h-[40px] lg:h-[48px] uppercase body cta aeonik whitespace-nowrap outline-none hover:underline active:underline bg-transparent text-white border border-solid border-white focus:bg-charcoal active:bg-charcoal disabled:text-secondary_text disabled:border-secondary_text">
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="ease-in-out -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100"
          >
            <path
              d="m13.696 7.385 4.54 4.54s.04.11 0 .15l-4.54 4.54M5.746 11.994h11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
          <span className="-translate-x-4 transition-all duration-500 group-hover:translate-x-4">
            Next Step
          </span>
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="ease-in-out -translate-x-4 opacity-100 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-0"
          >
            <path
              d="m13.696 7.385 4.54 4.54s.04.11 0 .15l-4.54 4.54M5.746 11.994h11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </motion.button>
        <div ref={scope}>
          <motion.button
            onClick={onButtonClick}
            whileTap={{ scale: 0.8 }}
            className="rounded-full border-2 border-blue-600 px-6 py-2 text-blue-600 transition-colors hover:bg-blue-100"
          >
            <span className="sr-only">Motion</span>
            <span className="block h-8 overflow-hidden" aria-hidden>
              {["M", "O", "T", "I", "O", "N"].map((letter, index) => (
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
              ))}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
