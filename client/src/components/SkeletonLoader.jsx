// frontend/src/components/SkeletonLoader.js
const SkeletonLoader = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <div className="animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 aspect-square w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-600 to-transparent opacity-50 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
