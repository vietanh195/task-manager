// Header
import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 mb-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300"    
    >
      <header className="py-10 text-center border-b border-neutral-200 transition-colors duration-300">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-gray-100 transition-colors duration-300">
          Task Manager
        </h1>
        <p className="text-neutral-500 dark:text-gray-400 text-sm mt-1 transition-colors duration-300">
          Focus on what matters today.
        </p>
      </header>
    </motion.form>
  );
}
