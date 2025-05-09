"use client";
import { useTheme } from '../contexts/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-900'>
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 
                hover:bg-gray-300 dark:hover:bg-gray-700
                transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
    <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
    </div>
  );
}