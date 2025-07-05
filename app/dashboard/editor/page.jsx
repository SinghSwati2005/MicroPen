"use client";

import Editor from "@/components/Editor";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          AI-Powered Voice Typing Editor
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          Speak. Style. Export. Your document, reimagined.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center"
      >
        <div className="bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/10 w-full max-w-[900px]">
          <Editor />
        </div>
      </motion.div>
    </div>
  );
}
