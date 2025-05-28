import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <section className="mt-20 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center md:text-left tracking-tight">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="cursor-pointer bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1.5 hover:bg-gray-50"
            style={{ backgroundColor: category.bgColor }}
          >
            <div className="w-20 h-20 flex items-center justify-center mb-4 transition-transform duration-300 transform hover:scale-105">
              <img
                src={category.image}
                alt={category.text}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="text-base font-medium text-gray-800 transition-colors duration-300 hover:text-primary">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
