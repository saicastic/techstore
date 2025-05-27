// frontend/src/components/ScraperForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchImages } from "../features/scraperSlice";
import { isValidUrl } from "../utils/helpers";

const ScraperForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urls = input
      .split(",")
      .map((url) => url.trim())
      .filter((url) => isValidUrl(url));
    if (urls.length > 0) {
      dispatch(fetchImages(urls));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URLs separated by commas"
          className="flex-1 p-4 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Scrape
        </button>
      </div>
    </form>
  );
};

export default ScraperForm;
