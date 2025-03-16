"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Send, Loader } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ASCIIText from "@/components/ASCIIText";
export default function Home() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "Welcome to $BIO/ACC. How can I assist you today?",
        isUser: false,
      },
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    // Simulate response
    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a simulated response from the $BIO/ACC agent. In a real implementation, this would connect to an actual backend service.",
          isUser: false,
        },
      ]);
    }, 2000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-green-400">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-green-900/50 bg-black/50 backdrop-blur-sm">
        <motion.div
          className="text-2xl font-mono font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-green-400"
            style={{ textShadow: "0 0 15px rgba(74, 222, 128, 0.7)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            $
          </motion.span>
          <motion.span
            className="text-green-400"
            style={{ textShadow: "0 0 20px rgba(74, 222, 128, 0.8)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            BIO
          </motion.span>
          <motion.span
            className="text-green-400"
            style={{ textShadow: "0 0 15px rgba(74, 222, 128, 0.7)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            /
          </motion.span>
          <motion.span
            className="text-green-400"
            style={{ textShadow: "0 0 20px rgba(74, 222, 128, 0.8)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ACC
          </motion.span>{" "}
          <motion.span
            className="text-purple-400"
            style={{ textShadow: "0 0 20px rgba(192, 132, 252, 0.8)" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Agent
          </motion.span>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="https://t.me/" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border-2 border-green-500 hover:bg-green-900/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ boxShadow: "0 0 15px rgba(74, 222, 128, 0.3)" }}
            >
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              </svg>
            </motion.div>
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border-2 border-green-500 hover:bg-green-900/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ boxShadow: "0 0 15px rgba(74, 222, 128, 0.3)" }}
            >
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </header>
      <ASCIIText text="BIO/ACC" enableWaves={true} asciiFontSize={3} />

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-green-900/30 text-green-400 border border-green-700"
                      : "bg-black text-green-400 border border-green-900"
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] rounded-lg p-3 bg-black text-green-400 border border-green-900">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                    </div>
                    <span className="text-xs text-green-500">
                      $BIO/ACC is thinking...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="border-t border-green-900/50 p-4">
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-black/50 border border-green-900 rounded-lg p-3 pr-10 text-green-400 placeholder-green-800 focus:outline-none focus:ring-1 focus:ring-green-700 resize-none h-12 overflow-hidden"
              style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.1)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ boxShadow: "inset 0 0 5px rgba(0, 255, 0, 0.2)" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ""}
            className={`p-3 rounded-full bg-black border border-green-700 text-green-400 hover:bg-green-900/30 transition-colors ${
              isLoading || input.trim() === ""
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)" }}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-900/50 p-2 text-center text-xs text-green-800">
        <p>
          © {new Date().getFullYear()} $BIO/ACC Agent | Aims to contribute
          meaningfully to the Bio/Acc and DeSci ecosystem.
        </p>
      </footer>
    </div>
  );
}
