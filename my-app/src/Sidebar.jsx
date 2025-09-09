import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data/data.json";


const Sidebar = ( { allergicIngredients, setAllergicIngredients} ) => {

  const items = data.ingredient.map(i => i.name);
  const ingredients = data.ingredient;

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  // const [selected, setSelected] = useState([]); // store multiple selections

  const [selected, setSelected] = useState(() => {
    const stored = localStorage.getItem("selectedAllergicNames");
    return stored ? JSON.parse(stored) : [];
  });


  useEffect(() => {
    localStorage.setItem("selectedAllergicNames", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("allergicIngredientIds", JSON.stringify(allergicIngredients));
  }, [allergicIngredients]);


  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    // filter results
    const matches = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(matches.length > 0 ? matches : ["No results"]);
  };

  // handle choosing
  const handleSelect = (name) => {
    if (name === "No results") return;

    const ingredient = ingredients.find(i => i.name === name);
    if (!ingredient) return;

    // add only if not already selected
    if (!selected.includes(name)) {
      setSelected([...selected, name]);
    }

    if (!allergicIngredients.includes(ingredient.id)) {
      setAllergicIngredients([...allergicIngredients, ingredient.id]);
    }

    setQuery(""); // clear input
    setFiltered([]); // close dropdown
  };

  // toggle remove when checkbox clicked
  const handleToggle = (name) => {
    const ingredient = ingredients.find(i => i.name === name);
    if (!ingredient) return;

    setSelected(selected.filter((n) => n !== name));
    setAllergicIngredients(allergicIngredients.filter((id) => id !== ingredient.id));
  };

  return (
    <div className="sidebar fixed top-[50px] left-0 h-[calc(100vh-50px)] w-56 bg-gray-900 text-white p-5 box-border">
      <h2 className="text-lg font-bold">My App</h2>


  <div className="relative w-46 mt-5">
    {/* Search Icon */}
    <span className="absolute mt-2 left-0 flex items-center pl-2 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
        />
      </svg>
    </span>

    {/* Input */}
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="ค้นหาสารประกอบ"
      className="w-full rounded-2xl border text-black border-gray-300 pl-8 pr-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

        {/* Dropdown */}
        {filtered.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-md text-black z-10">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  item === "No results" ? "text-black cursor-default" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Selected Items */}
        <div className="px-5 py-5 bg-white mt-10 rounded-2xl shadow-md h-[500px] flex flex-col items-start w-full overflow-y-auto">
          <p className="text-black font-medium mb-3">สารที่แพ้</p>

          {selected.length === 0 && (
            <p className="text-sm text-gray-400">ยังไม่ได้เลือก</p>
          )}

          <ul className="space-y-2 w-full">
            {selected.map((name, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-black">
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleToggle(name)}
                  className="cursor-pointer"
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;