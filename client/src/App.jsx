// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import ScraperForm from "./components/ScraperForm";
import ImageGrid from "./components/ImageGrid";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <ThemeToggle />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ScraperForm />
                    <ImageGrid />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
