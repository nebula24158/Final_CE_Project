import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './Sidebar.jsx';
import TopBar from './Topbar.jsx';
import Productgrid from './Productgrid.jsx';
import ProductDetail from './Productdetail.jsx';
import './App.css'
import data from "./data/data.json";

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [allergicIngredients, setAllergicIngredients] = useState([]);

  // all products from JSON
  const products = data.product;
  const ingredients = data.ingredient;

  // filter products if a category is selected
  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.category === selectedCategoryId)
    : products;

  return (
    <Router>
      <div className="app-root">
        <TopBar onCategorySelect={(id) => setSelectedCategoryId(id)} />
        <div className="app-container">
          <Routes>
          <Route
            path="/"
            element={
              <div className="app-container flex">
                <Sidebar
                  allergicIngredients={allergicIngredients}
                  setAllergicIngredients={setAllergicIngredients}
                />
                <div className="flex-1">
                  <Productgrid
                    products={filteredProducts}
                    allergicIngredients={allergicIngredients}
                  />
                </div>
              </div>
            }
          />

            {/* Product detail page */}
            <Route
              path="/product/:id"
              element={
                <div className="flex justify-center items-center">
                  <ProductDetail products={products} ingredients={ingredients} allergicIngredients={allergicIngredients}/>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
