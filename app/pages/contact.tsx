import { motion } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import STButton from "../shared/stbutton";
import {
  PiGithubLogoLight,
  PiLinkedinLogoLight,
  PiTelegramLogoLight,
  PiAtLight,
} from "react-icons/pi";

export default function Contact({
  secondFont,
  isDark,
}: {
  secondFont: NextFont;
  isDark: boolean;
}) {
  const handleButtonClick = () => {
    const link = document.createElement("a");
    link.href = "mailto:olegletto@gmail.com";
    link.target = "_blank";
    link.click();
  };
  return (
    <section
      id="contact"
      className={`h-screen mx-auto py-10 flex flex-col gap-4 items-center justify-center ${
        isDark ? "bg-[#0f172a] text-[#f8fafc]" : "bg-[#f8fafc] text-[#94a3b8]"
      }`}
    >
      <p className=" text-lg flex items-center my-5"> What&apos;s Next?</p>
      <h2 className="text-center text-4xl my-4">Get In Touch</h2>
      <p className={`max-w-lg text-center my-4 mx-2 ${secondFont.className}`}>
        {
          "Ready to discuss your next project? I'd love to hear from you. Let's create something amazing together."
        }
      </p>
      <STButton
        label="Mail_Me"
        font={secondFont}
        handleButtonClick={handleButtonClick}
      />

      <div className="flex items-center justify-center w-full py-6 gap-4">
        <motion.a
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          href="https://github.com/olegletto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="w-10 h-10 text-xl border rounded-full hover:border-[#38bdf8] hover:text-[#38bdf8] inline-flex items-center justify-center cursor-pointer">
            <PiGithubLogoLight />
          </span>
        </motion.a>
        <motion.a
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          href="https://t.me/olegletto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="w-10 h-10 text-xl border rounded-full hover:border-[#38bdf8] hover:text-[#38bdf8] inline-flex items-center justify-center cursor-pointer">
            <PiTelegramLogoLight />
          </span>
        </motion.a>
        <motion.a
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          href="https://www.linkedin.com/in/olegletto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="w-10 h-10 text-xl border rounded-full hover:border-[#38bdf8] hover:text-[#38bdf8] inline-flex items-center justify-center cursor-pointer">
            <PiLinkedinLogoLight />
          </span>
        </motion.a>
        <motion.a
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
          href="mailto:olegletto@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="w-10 h-10 text-xl border rounded-full hover:border-[#38bdf8] hover:text-[#38bdf8] inline-flex items-center justify-center cursor-pointer">
            <PiAtLight />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
