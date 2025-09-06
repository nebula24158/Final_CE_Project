import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './Sidebar.jsx';
import TopBar from './Topbar.jsx';
import Productgrid from './Productgrid.jsx';
import './App.css'
import data from "./data/data.json";

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [allergicIngredients, setAllergicIngredients] = useState([]);

  // all products from JSON
  const products = data.product;

  // filter products if a category is selected
  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.category === selectedCategoryId)
    : products;

  return (
    <div className="app-root">
      <TopBar onCategorySelect={(id) => setSelectedCategoryId(id)} />
      <div className="app-container">
        {/* <Sidebar /> */}
        <Sidebar 
          allergicIngredients={allergicIngredients}
          setAllergicIngredients={setAllergicIngredients}/>
        <Productgrid products={filteredProducts} allergicIngredients={allergicIngredients}/>
        {/* <Productgrid products={filteredProducts}/> */}
      </div>
    </div>
  );
}

export default App
