// frontend/src/components/ImageGrid.js
import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";
import SkeletonLoader from "./SkeletonLoader";

const ImageGrid = () => {
  const { images, status, error } = useSelector((state) => state.scraper);

  if (status === "failed") {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (status === "succeeded" && images.length === 0) {
    return <div className="text-gray-500 text-center p-4">No images found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {status === "loading" &&
        Array(6)
          .fill()
          .map((_, i) => <SkeletonLoader key={i} />)}

      {images.map((imgUrl, index) => (
        <ImageCard key={`${imgUrl}-${index}`} imgUrl={imgUrl} />
      ))}
    </div>
  );
};

export default ImageGrid;
