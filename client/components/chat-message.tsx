"use client"

import { motion } from "framer-motion"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-green-900/30 text-green-400 border border-green-700"
            : "bg-black text-green-400 border border-green-900"
        }`}
        style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.1)" }}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </motion.div>
  )
}

