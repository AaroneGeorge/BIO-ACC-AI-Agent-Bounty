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
    const lines = text.split('\n')
    let inBulletList = false
    let inNumberedList = false
    let formattedLines = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Check if line is a bullet point
      if (line.match(/^[-*•] /)) {
        // Start a new list if not in one
        if (!inBulletList) {
          inBulletList = true
          formattedLines.push('<ul class="my-2 list-disc pl-5">')
        }
        
        // Add list item
        formattedLines.push(`<li class="my-1">${line.substring(2)}</li>`)
      } 
      // Check if line is a numbered list item
      else if (line.match(/^\d+\.\s/)) {
        // Start a new list if not in one
        if (!inNumberedList) {
          inNumberedList = true
          formattedLines.push('<ol class="my-2 list-decimal pl-5">')
        }
        
        // Add list item
        const content = line.substring(line.indexOf('.') + 2)
        formattedLines.push(`<li class="my-1">${content}</li>`)
      }
      // Not a list item
      else {
        // Close any open lists
        if (inBulletList) {
          inBulletList = false
          formattedLines.push('</ul>')
        }
        if (inNumberedList) {
          inNumberedList = false
          formattedLines.push('</ol>')
        }
        
        // Handle empty lines
        if (line === '') {
          formattedLines.push('<div class="my-2"></div>')
        } else {
          formattedLines.push(`<p class="my-2">${line}</p>`)
        }
      }
    }
    
    // Close any open lists at the end
    if (inBulletList) {
      formattedLines.push('</ul>')
    }
    if (inNumberedList) {
      formattedLines.push('</ol>')
    }
    
    return formattedLines.join('')
  }
  
  // Process text to format it
  const formatText = (text: string) => {
    if (isUser) return text
    
    // Format links first
    let formattedText = formatTextWithLinks(text)
    
    // Format lists with our custom function
    formattedText = formatLists(formattedText)
    
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
            ? "bg-green-900/40 text-green-400 border border-green-700"
            : "bg-black/70 text-green-400 border border-green-900"
        }`}
        style={{ 
          boxShadow: isUser 
            ? "0 0 10px rgba(0, 255, 0, 0.2)" 
            : "0 0 15px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 255, 0, 0.1)"
        }}
      >
        {isUser ? (
          <p className="text-sm md:text-base break-words">{message}</p>
        ) : (
          <div 
            ref={messageRef}
            className="text-sm md:text-base break-words message-content"
          />
        )}
      </div>
    </motion.div>
  )
}

