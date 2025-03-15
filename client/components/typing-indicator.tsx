"use client"

import { motion } from "framer-motion"

export default function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
      <div className="max-w-[80%] rounded-lg p-3 bg-black text-green-400 border border-green-900">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
          </div>
          <span className="text-xs text-green-500">$BIO/ACC is thinking...</span>
        </div>
      </div>
    </motion.div>
  )
}

