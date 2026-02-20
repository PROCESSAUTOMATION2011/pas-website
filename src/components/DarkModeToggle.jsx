import React, { useContext } from 'react';
import { DarkModeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <button
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-xl"
      onClick={() => setDarkMode(dm => !dm)}
      type="button"
    >
      {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700 dark:text-gray-200" />}
    </button>
  );
};

export default DarkModeToggle; 