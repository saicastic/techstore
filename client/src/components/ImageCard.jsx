// frontend/src/components/ImageCard.js
import { useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiDownload, FiShare2 } from "react-icons/fi";
import useLazyLoading from "../hooks/useLazyLoading";

const ImageCard = ({ imgUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef();
  const isVisible = useLazyLoading(imgRef);

  const handleDownload = async () => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = imgUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(imgUrl);
      alert("Image URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      ref={imgRef}
      className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {isVisible && (
        <LazyLoadImage
          src={imgUrl}
          beforeLoad={() => setIsLoading(true)}
          afterLoad={() => setIsLoading(false)}
          effect="opacity"
          className="w-full h-full object-cover"
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiDownload className="text-xl" />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiShare2 className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
