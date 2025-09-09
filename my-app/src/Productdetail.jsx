import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import watson_logo from "./pic/watson_logo.png"
// import data from "./data/data.json";

const ProductDetail = ({ products, ingredients, allergicIngredients }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return <p className="p-5">Product not found</p>;
  }
  // console.log("Ingredients:", ingredients);
  // console.log("Ingredient:", data.ingredient);
  
  // console.log("Products:", products);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1
    );
  };

   const productIngredients = product.ingredient.map(ingId =>
      ingredients.find(ing => ing.id === ingId)
    );

  return (
    <div className="mt-16 w-full px-20 py-8">
      {/* <div className="container mx-auto px-4 py-8"> */}
        <div className="flex flex-wrap -mx-4">
          {/* LEFT: IMAGE CAROUSEL */}
          <div className="w-full md:w-1/2 px-4 mb-8 ">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-md">
                {product.image.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Product image ${index + 1}`}
                      className="block w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <div className="absolute z-30 flex -translate-x-1/2 space-x-2 bottom-4 left-1/2">
                {product.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    type="button"
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/40 group-hover:bg-white/70">
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </span>
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/40 group-hover:bg-white/70">
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-2 mt-4 ml-10">{product.name}</h2>
            <p className="text-gray-600 mb-4 ml-10">SKU: {product.id}</p>

            <div className="mb-4">
              <span className="text-2xl font-bold mr-2 ml-10">$349.99</span>
            </div>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <img
                src={watson_logo}
                alt={product.name}
                className="w-36 ml-10 h-auto hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="w-full md:w-1/2 px-4 bg-red">
            <h3 className="text-lg font-semibold mb-2">ส่วนประกอบ</h3>
          <div className="flex flex-wrap gap-2">
            {productIngredients
              .filter(Boolean)
              .map((ing, index) => {
                const isUserAllergic = allergicIngredients.includes(ing.id);
                return (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${
                      isUserAllergic
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {isUserAllergic && <span>⚠️</span>}
                    {ing.name}
                  </span>
                );
              })}

            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 mt-4">รายละเอียดผลิตภัณฑ์</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 mt-4">วิธีการใช้งาน</h3>
              <p className="text-gray-700">{product.using}</p>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ProductDetail;
