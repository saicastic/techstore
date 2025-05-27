// frontend/src/components/ThemeToggle.js
import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {darkMode ? (
          <FiSun className="w-6 h-6 text-yellow-400" />
        ) : (
          <FiMoon className="w-6 h-6 text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
