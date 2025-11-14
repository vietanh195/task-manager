// App.js

import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ThemeProvider } from "./context/ThemeContext"; 

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors p-4">
      <Navbar />
      <Home />
    </div>
  );
}