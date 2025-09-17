'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const knowledgeBase = {
  greeting: "Hello! I'm Deepika's assistant. How can I help you today?",
  about: "I'm Deepika Rajpurohit, a passionate full-stack developer with expertise in modern web technologies.",
  skills: "I specialize in: React, Node.js, TypeScript, MongoDB, and more. Check out my portfolio for a complete list!",
  contact: "You can reach me via email at deepikarajpurohit001@gmail.com or connect with me on LinkedIn.",
  experience: "I have experience working on various web development projects, including full-stack applications and responsive websites.",
  jobsearch: "I'm currently open to new opportunities in frontend and full-stack development roles. I'm particularly interested in positions that allow me to work with modern JavaScript frameworks and cloud technologies.",
  default: "I'm sorry, I didn't understand that. Could you rephrase your question? I can tell you about Deepika's skills, experience, job search status, or how to contact her."
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat is opened
      setMessages([{ text: knowledgeBase.greeting, sender: 'bot' }]);
    }
    scrollToBottom();
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return knowledgeBase.greeting;
    } else if (input.includes('about') || input.includes('who are you')) {
      return knowledgeBase.about;
    } else if (input.includes('skill') || input.includes('what can you do') || input.includes('technology')) {
      return knowledgeBase.skills;
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('linkedin')) {
      return knowledgeBase.contact;
    } else if (input.includes('experience') || input.includes('work history') || input.includes('background')) {
      return knowledgeBase.experience;
    } else if (input.includes('job') || input.includes('hiring') || input.includes('opportunity') || 
               input.includes('looking for work') || input.includes('available for work') || 
               input.includes('open to work') || input.includes('career')) {
      return knowledgeBase.jobsearch;
    } else {
      return knowledgeBase.default;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);

    setInputValue('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-80 h-96 flex flex-col border border-blue-500"
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-semibold">Deepika's Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-800 text-white rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Open chat"
          >
            <FaRobot size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
