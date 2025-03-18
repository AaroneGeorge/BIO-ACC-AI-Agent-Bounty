"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Send, Loader } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ASCIIText from "@/components/ASCIIText";
import ChatMessage from "@/components/chat-message";
import TypingIndicator from "@/components/typing-indicator";
import { v4 as uuidv4 } from 'uuid';

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
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Generate a new session ID for each page refresh
    const newUserId = uuidv4();
    localStorage.setItem("bioaccUserId", newUserId);
    setUserId(newUserId);

    // Optional: Clean up previous messages from localStorage if needed
    // localStorage.removeItem("bioaccMessages");
  }, []);

  const handleSend = async () => {
    if (input.trim() === "" || !userId) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    const currentInput = input; // Store the current input for the API call
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: currentInput,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();
      
      // Add agent response from the backend
      if (data && data.length > 0) {
        const agentResponse = data[0];
        setMessages((prev) => [
          ...prev,
          { text: agentResponse.text, isUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with the agent:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error while processing your request. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex flex-col h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Background ASCIIText - Positioned as background but above black */}
      <div className="absolute inset-0 overflow-hidden">
        <ASCIIText text="BIO/ACC" enableWaves={true} asciiFontSize={3} />
      </div>

      {/* Content Container - Creates a semi-transparent background for content */}
      <div className="flex flex-col h-screen relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-green-900/50 bg-black/70 backdrop-blur-sm">
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
            <Link href="https://t.me/bio_acc_bot" target="_blank" rel="noopener noreferrer">
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
              href="https://x.com/BIOACC_SOL_CTO"
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

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black bg-black/40">
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message.text} 
                  isUser={message.isUser} 
                />
              ))}
              {isLoading && <TypingIndicator />}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <div className="border-t border-green-900/50 p-4 bg-black/50">
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
        <footer className="border-t border-green-900/50 p-2 text-center text-xs text-green-800 bg-black/70">
          <p>
            © {new Date().getFullYear()} $BIO/ACC Agent | Aims to contribute
            meaningfully to the Bio/Acc and DeSci ecosystem.
          </p>
        </footer>
      </div>
    </div>
  );
}
