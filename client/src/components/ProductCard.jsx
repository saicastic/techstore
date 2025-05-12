import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  if (!product) return null;

  const inCart = cartItems[product._id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group bg-white rounded-lg border border-gray-150 cursor-pointer overflow-hidden hover:border-gray-300 transition-colors duration-200"
    >
      {/* Compact Image Container */}
      <div className="aspect-square flex items-center justify-center bg-gray-50  overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content Area */}
      <div className="p-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-1">
            {product.category}
          </p>
          <h3 className="text-[14px] font-semibold text-gray-900 leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[16px] font-bold text-gray-900">
              {currency} {product.offerPrice}
            </p>
            {product.offerPrice < product.price && (
              <p className="text-[12px] text-gray-400 line-through mt-0.5">
                {currency} {product.price}
              </p>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {!inCart ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCart(product._id)}
                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] rounded-sm cursor-pointer shadow-sm"
              >
                Add to Cart
              </motion.button>
            ) : (
              <div className="flex items-center gap-2.5 bg-gray-500 px-2.5 py-1 rounded-md">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-gray-600 hover:text-gray-900 font-medium text-[15px] w-5 cursor-pointer"
                >
                  -
                </button>
                <span className="text-[13px] font-medium min-w-[20px] text-center">
                  {inCart}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="text-gray-600 hover:text-gray-900 font-medium text-[15px] w-5 cursor-pointer"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
