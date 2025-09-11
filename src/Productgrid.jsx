import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';


const Productgrid = ({ products, allergicIngredients }) => {
  // Products that are safe (none of the ingredients match allergic IDs)
const safeProducts =
  allergicIngredients && allergicIngredients.length > 0
    ? products.filter(
        (p) => !p.ingredient.some((id) => allergicIngredients.includes(id))
      )
    : products;

// Products that contain allergens
const allergicProducts =
  allergicIngredients && allergicIngredients.length > 0
    ? products.filter((p) => p.ingredient.some((id) => allergicIngredients.includes(id)))
    : [];
    
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 ml-56">
      {/* If no allergy selected → normal grid */}
      {(!allergicIngredients || allergicIngredients.length === 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {safeProducts.map((p, index) => (
            <ProductCard key={index} product={p} />
          ))}
        </div>
      )}

      {/* If allergy selected → 2 columns */}
      {allergicIngredients && allergicIngredients.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-center mt-4">
          {/* Safe products */}
          <div>
            <h2 className="text-xl font-bold text-green-700 mb-4">
              ✅ ผลิตภัณฑ์แนะนำให้ใช้
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {safeProducts.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))}
            </div>
          </div>

          {/* Allergic products */}
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-4">
              ⚠️ ผลิตภัณฑ์ที่มีโอกาสแพ้
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {allergicProducts.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="flex justify-center">
      <img
        src={product.image[0]}
        alt={product.name}
        className="h-[150px] object-cover"
      />
    </div>
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <span className="block text-gray-500 mb-3">{product.price}</span>
      <Link
        to={`/product/${product.id}`}
        className="inline-block px-5 py-2 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
      >
        View All
      </Link>
    </div>
  </div>
);

export default Productgrid;
