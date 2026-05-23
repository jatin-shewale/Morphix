import React from "react";
import { motion } from "framer-motion";

export default function Logo({ size = 32, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="morphixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" /> {/* Amber 500 */}
              <stop offset="50%" stopColor="#EF4444" /> {/* Red 500 */}
              <stop offset="100%" stopColor="#EC4899" /> {/* Pink 500 */}
            </linearGradient>
            <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Morphing Background Circle */}
          <motion.path
            d="M 50 15 C 65 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 15 70, 15 50 C 15 30, 35 15, 50 15 Z"
            fill="url(#morphixGradient)"
            animate={{
              d: [
                "M 50 15 C 65 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 15 70, 15 50 C 15 30, 35 15, 50 15 Z",
                "M 50 18 C 70 12, 82 28, 82 48 C 82 68, 68 82, 48 82 C 28 82, 18 68, 18 48 C 18 28, 30 24, 50 18 Z",
                "M 50 15 C 65 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 15 70, 15 50 C 15 30, 35 15, 50 15 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Inner Abstract M shape representing Morphix */}
          <path
            d="M 32 65 V 38 L 50 54 L 68 38 V 65"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sparkle/Dot details */}
          <circle cx="50" cy="28" r="4.5" fill="white" />
        </svg>
      </motion.div>
      <span className="font-display font-bold tracking-tight text-stone-900 text-xl md:text-2xl select-none">
        Morph<span className="text-amber-500">ix</span>
      </span>
    </div>
  );
}
