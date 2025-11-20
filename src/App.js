import React from 'react';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import './App.css'; // Để import global CSS/Tailwind

export default function App() {
  return (
    // Bọc toàn bộ ứng dụng bằng ThemeProvider
    <ThemeProvider>
      {/* Home chứa Navbar và logic Task */}
      <Home />
    </ThemeProvider>
  );
}