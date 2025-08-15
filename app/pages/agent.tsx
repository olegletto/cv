"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";
import { getExperienceContext } from "../shared/experience";
import STButton from "../shared/stbutton";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AgentPageProps {
  firstFont: NextFont;
  secondFont: NextFont;
  isDark: boolean;
}

const AgentPage: React.FC<AgentPageProps> = ({ firstFont, secondFont, isDark }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const experienceContext = getExperienceContext();


  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userQuestion: string): Promise<string> => {
    try {
      // Use API route instead of direct AI service
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuestion,
          experienceContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to simple responses if AI is unavailable
      const question = userQuestion.toLowerCase();
      
      // Determine request language
      const isRussian = /[а-яё]/i.test(userQuestion);
      
      if (question.includes("опыт") || question.includes("experience")) {
        if (isRussian) {
          return "У меня более 5 лет опыта в frontend разработке. Начинал как Intern Software Engineer в Orion Innovation, затем работал над проектами Avaya как Frontend Developer, и сейчас занимаю позицию Frontend Expert на платформе Outlier. За это время я работал с различными технологиями и проектами разного масштаба.";
        } else {
          return "I have over 5 years of experience in frontend development. I started as a Intern Software Engineer at Orion Innovation, then worked as a Frontend Developer at Avaya, and currently hold the position of Frontend Expert at Outlier. During this time, I've worked with various technologies and projects of different scales.";
        }
      }
      
      if (question.includes("react") || question.includes("typescript")) {
        if (isRussian) {
          return "React и TypeScript - мои основные технологии. Я использую их в большинстве проектов. Имею опыт с функциональными компонентами, хуками, Context API, Redux Toolkit. Также работаю с Next.js для SSR/SSG приложений. TypeScript помогает мне писать более надежный и поддерживаемый код.";
        } else {
          return "React and TypeScript are my core technologies. I use them in most projects. I have experience with functional components, hooks, Context API, Redux Toolkit. I also work with Next.js for SSR/SSG applications. TypeScript helps me write more reliable and maintainable code.";
        }
      }
      
      if (question.includes("проект") || question.includes("project")) {
        if (isRussian) {
          return "Я работал над различными проектами: e-commerce платформа с PWA функциональностью, task management приложение с real-time коллаборацией, и этот портфолио сайт. Каждый проект требовал разных подходов и технологий, что помогло мне развить широкий набор навыков.";
        } else {
          return "I've worked on various projects: an e-commerce platform with PWA functionality, a task management application with real-time collaboration, and this portfolio website. Each project required different approaches and technologies, which helped me develop a wide range of skills.";
        }
      }
      
      if (question.includes("навык") || question.includes("skill")) {
        if (isRussian) {
          return "Мои основные навыки включают React, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, GraphQL, WebSocket. Также имею опыт с тестированием (Jest, React Testing Library), сборкой проектов (Webpack, Vite), и оптимизацией производительности.";
        } else {
          return "My main skills include React, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, GraphQL, WebSocket. I also have experience with testing (Jest, React Testing Library), project building (Webpack, Vite), and performance optimization.";
        }
      }
      
      if (question.includes("образование") || question.includes("education")) {
        if (isRussian) {
          return "Я проходил курсы профессиональной ориентации по предмету JavaScript на базе Университета Нижнего Новгорода в 2019 году, а так же имею различные сертификаты с платформы обучения LinkedIn Learning.";
        } else { 
          return "I studied JavaScript at the University of Nizhny Novgorod in 2019, and also have certifications from LinkedIn Learning.";
        }
      }
      
      if (question.includes("контакт") || question.includes("contact")) {
        if (isRussian) {
          return "Вы можете связаться со мной по email: olegletto@gmail.com, или найти меня на LinkedIn: linkedin.com/in/olegletto и GitHub: github.com/olegletto. Я всегда открыт для новых возможностей и интересных проектов.";
        } else {
          return "You can contact me via email: olegletto@gmail.com, or find me on LinkedIn: linkedin.com/in/olegletto and GitHub: github.com/olegletto. I'm always open to new opportunities and interesting projects.";
        }
      }
      
      // General response based on language
      if (isRussian) {
        return "Спасибо за ваш вопрос! Я frontend разработчик с опытом работы более 5 лет. Специализируюсь на React, TypeScript, Next.js и современных веб-технологиях. Могу рассказать подробнее о моем опыте работы, проектах, навыках или образовании. Что именно вас интересует?";
      } else {
        return "Thank you for your question! I'm a frontend developer with over 5 years of experience. I specialize in React, TypeScript, Next.js, and modern web technologies. I can tell you more about my work experience, projects, skills, or education. What specifically interests you?";
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputValue.trim());
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, an error occurred while generating the response. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonClick = () => {
    handleSendMessage();
  };

  return (
    <div className={`h-screen flex flex-col pt-20 pb-10 px-10 ${secondFont.className} ${isDark ? "bg-[#182543] text-[#f8fafc]" : "bg-[#fcfcfc] text-[#1e293b]"}`}>
      {/* Header */}
      <motion.div 
        className="flex-shrink-0  border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center">
          <h1 className={`text-3xl font-bold ${firstFont.className} bg-gradient-to-r from-blue-500 via-green-500 to-purple-600 bg-clip-text text-transparent mb-4`}>
            Ask <strong>AI agent</strong> about my experience
          </h1>
        </div>
      </motion.div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.isUser
                      ? `${isDark ? "bg-[#38bdf8] text-white" : "bg-[#005670] text-white"}`
                      : `${isDark ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800"}`
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.isUser ? "text-blue-100" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-3 ${isDark ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800"}`}>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input field */}
      <motion.div 
        className="flex-shrink-0 p-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about my experience, skills, projects..."
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                isDark 
                  ? "bg-gray-800 border-gray-600 text-white focus:border-[#38bdf8] focus:ring-[#38bdf8]/20" 
                  : "bg-white border-gray-300 text-gray-800 focus:border-[#005670] focus:ring-[#005670]/20"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
          <STButton
            label="Send"
            font={firstFont}
            handleButtonClick={handleButtonClick}
            disabled={isLoading || !inputValue.trim()}
            className={isLoading || !inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AgentPage;
