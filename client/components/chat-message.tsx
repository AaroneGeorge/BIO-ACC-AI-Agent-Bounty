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
    // Regex to match URLs - improved to better match a variety of URLs
    const urlRegex = /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g
    
    // Replace URLs with anchor tags
    return text.replace(urlRegex, (url) => {
      // Format the display URL to be more readable
      const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '')
      return `<a href="${url}" class="text-purple-400 underline hover:text-purple-300 hover:brightness-125 transition-colors" target="_blank" rel="noopener noreferrer">${displayUrl}</a>`
    })
  }
  
  // Function to detect and format code blocks
  const formatCodeBlocks = (text: string) => {
    // Match code blocks (text between triple backticks)
    const codeBlockRegex = /```(?:([\w-]+)\n)?([\s\S]*?)```/g
    
    return text.replace(codeBlockRegex, (match, language, code) => {
      // Clean up the code and language
      const lang = language ? language.trim() : ''
      const cleanCode = code.trim()
      
      return `<div class="my-3 rounded-md overflow-hidden">
        ${lang ? `<div class="bg-green-900/40 px-3 py-1 text-xs font-mono">${lang}</div>` : ''}
        <pre class="bg-black/80 p-3 overflow-x-auto border border-green-900/50 text-xs sm:text-sm font-mono"><code>${cleanCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>`
    })
  }
  
  // Function to format inline code
  const formatInlineCode = (text: string) => {
    // Match inline code (text between single backticks)
    const inlineCodeRegex = /`([^`]+)`/g
    
    return text.replace(inlineCodeRegex, (match, code) => {
      return `<code class="bg-green-900/30 px-1 py-0.5 rounded font-mono text-xs sm:text-sm">${code}</code>`
    })
  }
  
  // Function to format headings
  const formatHeadings = (text: string) => {
    // Match headings (lines starting with # symbols)
    return text.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, content) => {
      const level = hashes.length
      const size = level === 1 ? 'text-xl font-bold' : level === 2 ? 'text-lg font-bold' : 'text-base font-bold'
      return `<h${level} class="${size} my-3">${content}</h${level}>`
    })
  }
  
  // Function to format lists
  const formatLists = (text: string) => {
    const lines = text.split('\n')
    let inBulletList = false
    let inNumberedList = false
    const formattedLines = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Check if line is a bullet point
      if (line.match(/^[-*•] /)) {
        // Start a new list if not in one
        if (!inBulletList) {
          inBulletList = true
          formattedLines.push('<ul class="my-3 list-disc pl-5 space-y-1">')
        }
        
        // Format the content of the list item with links
        const content = formatTextWithLinks(line.substring(2))
        formattedLines.push(`<li>${content}</li>`)
      } 
      // Check if line is a numbered list item
      else if (line.match(/^\d+\.\s/)) {
        // Start a new list if not in one
        if (!inNumberedList) {
          inNumberedList = true
          formattedLines.push('<ol class="my-3 list-decimal pl-5 space-y-1">')
        }
        
        // Format the content of the list item with links
        const content = formatTextWithLinks(line.substring(line.indexOf('.') + 2))
        formattedLines.push(`<li>${content}</li>`)
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
          formattedLines.push('<div class="py-1"></div>')
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
    
    // Step 1: Format code blocks first to prevent interference with other formatting
    let formattedText = formatCodeBlocks(text)
    
    // Step 2: Format headings
    formattedText = formatHeadings(formattedText)
    
    // Step 3: Format links
    formattedText = formatTextWithLinks(formattedText)
    
    // Step 4: Format inline code
    formattedText = formatInlineCode(formattedText)
    
    // Step 5: Format lists with our custom function
    formattedText = formatLists(formattedText)
    
    return formattedText
  }
  
  // Apply formatted HTML safely
  useEffect(() => {
    if (messageRef.current && !isUser) {
      messageRef.current.innerHTML = formatText(message)
      
      // Add click event listeners to any code blocks for copying code
      const codeBlocks = messageRef.current.querySelectorAll('pre code')
      codeBlocks.forEach(block => {
        block.addEventListener('click', () => {
          const code = block.textContent || ''
          navigator.clipboard.writeText(code)
            .then(() => {
              // Optional: Show a small visual feedback when code is copied
              const originalBg = block.parentElement?.style.background
              if (block.parentElement) {
                block.parentElement.style.background = 'rgba(74, 222, 128, 0.2)'
                setTimeout(() => {
                  if (block.parentElement) {
                    block.parentElement.style.background = originalBg || ''
                  }
                }, 300)
              }
            })
            .catch(err => console.error('Failed to copy code:', err))
        })
      })
    }
  }, [message, isUser, formatText])

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

