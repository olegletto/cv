import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";

export default function Header({
  font,
  isDark,
  setIsDark,
}: {
  font: NextFont;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full flex items-center justify-between py-2 px-10 bg-white/50 text-gray-800 shadow-xl ${font.className}`}
    >
      <div className="text-xl font-bold">OLEG LABUNIN</div>
      <nav>
        <ul className="flex items-center space-x-4">
          {/* <li>
            <a href="#home" className=" self-center hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li> */}
          <li>
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className={`p-2 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
