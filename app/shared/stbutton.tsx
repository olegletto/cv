import { motion, stagger, useAnimate } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import React from "react";

interface STButtonProps {
  label: string;
  font: NextFont;
  handleButtonClick: () => void;
  disabled?: boolean;
  className?: string;
}

const STButton: React.FC<STButtonProps> = ({
  label,
  handleButtonClick,
  font,
}) => {
  const [scope, animate] = useAnimate();
  const textButton = label.split("");

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

    handleButtonClick();
  };

  return (
    <div ref={scope} className="py-2 self-center">
      <motion.button
        onClick={onButtonClick}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => handleHover()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl border hover:border-[#38bdf8] hover:text-[#38bdf8] px-6 py-2 cursor-pointer ${font.className}`}
      >
        <span className="sr-only">{label}</span>
        <span className="block h-8 overflow-hidden" aria-hidden>
          {textButton.map((letter, index) => (
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
  );
};

export default STButton;
