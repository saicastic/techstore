import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (item) => product?.category === item.category && item._id !== id
      );
      setRelatedProducts(filtered.slice(0, 4));
    }
  }, [products, id, product?.category]);

  useEffect(() => {
    setThumbnail(product?.image[0] || null);
  }, [product]);

  if (!product)
    return <div className="container mx-auto py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /
        <Link to="/products" className="hover:text-primary">
          {" "}
          Products
        </Link>{" "}
        /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>{" "}
        /<span className="text-primary font-medium">{product.name}</span>
      </nav>

      {/* Product Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 flex flex-col-reverse lg:flex-row gap-2">
          <div className="flex lg:flex-col gap-3  pb-2">
            {product.image.map((image, index) => (
              <button
                key={index}
                onClick={() => setThumbnail(image)}
                className={`shrink-0 w-20 h-20 border rounded-lg overflow-hidden transition-all ${
                  thumbnail === image
                    ? "border-2 border-primary"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-full object-cover  transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-primary">
                {currency}
                {product.offerPrice}
              </span>
              {product.offerPrice < product.price && (
                <span className="text-gray-400 line-through">
                  {currency}
                  {product.price}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <ul className="space-y-2 list-disc pl-5 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 px-6 bg-primary cursor-pointer text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-3 px-6 bg-gray-900 cursor-pointer text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Related Products
          </h2>
          <div className="mx-auto w-12 h-1 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="px-8 py-2.5 text-primary border border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
          >
            View All Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
