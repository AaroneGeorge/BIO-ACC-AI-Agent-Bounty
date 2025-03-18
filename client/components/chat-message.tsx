"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)
  
  // Function to convert URLs in text to clickable links
  const formatTextWithLinks = (text: string) => {
    // Regex to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g
    
    // Replace URLs with anchor tags
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" class="text-purple-400 underline hover:text-purple-300 transition-colors" target="_blank" rel="noopener noreferrer">${url}</a>`
    })
  }
  
  // Function to format lists
  const formatLists = (text: string) => {
    // Format bullet points (lines starting with - or *)
    let formattedText = text.replace(/^[-*•] (.+)$/gm, '<li class="ml-5">$1</li>')
    
    // Format numbered lists (lines starting with 1., 2., etc.)
    formattedText = formattedText.replace(/^\d+\.\s(.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    
    // Wrap consecutive list items in ul/ol tags
    formattedText = formattedText.replace(/<li class="ml-5">(.+?)<\/li>(\s*<li class="ml-5">(.+?)<\/li>)+/gs, '<ul class="my-2 list-disc">$&</ul>')
    formattedText = formattedText.replace(/<li class="ml-5 list-decimal">(.+?)<\/li>(\s*<li class="ml-5 list-decimal">(.+?)<\/li>)+/gs, '<ol class="my-2 list-decimal">$&</ol>')
    
    return formattedText
  }
  
  // Process text to format it
  const formatText = (text: string) => {
    if (isUser) return text
    
    // Convert newlines to <br> tags
    let formattedText = text.replace(/\n/g, '<br>')
    
    // Format links
    formattedText = formatTextWithLinks(formattedText)
    
    // Format lists
    formattedText = formatLists(formattedText)
    
    // Add spacing between paragraphs
    formattedText = formattedText.replace(/(<br>){2,}/g, '<div class="my-2"></div>')
    
    return formattedText
  }
  
  // Apply formatted HTML safely
  useEffect(() => {
    if (messageRef.current && !isUser) {
      messageRef.current.innerHTML = formatText(message)
    }
  }, [message, isUser])

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
        {isUser ? (
          <p className="text-sm md:text-base break-words">{message}</p>
        ) : (
          <div 
            ref={messageRef}
            className="text-sm md:text-base break-words whitespace-pre-wrap message-content"
          />
        )}
      </div>
    </motion.div>
  )
}

