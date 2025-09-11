import React, { useState } from "react";
import "./App.css";
import data from "./data/data.json";

const categories = data.category;

const TopBar = ({ onCategorySelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev); // toggle open/close
  };

  const handleSelect = (cat) => {
    setSelectedCategory(cat); // save whole category {id, name}
    setOpen(false); // close dropdown
    onCategorySelect(cat ? cat.id : null);
    console.log("Selected category id:", cat.id); // ✅ here you get the id
  };

  return (
    <div className="topbar fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-gray-100 shadow-md">
      <div className="topbar-left"></div>

      <div className="topbar-center">
        <div className="relative inline-block text-left">
          {/* Button */}
          <button
            onClick={toggleDropdown}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-20 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            {selectedCategory ? selectedCategory.name : "เลือกผลิตภัณฑ์ที่ต้องการค้นหา"}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className={`-mr-1 size-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
              <div className="py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {cat.name}
                  </button>
                ))}
                <button
                  onClick={() => handleSelect(null)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  All Categories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">ติดต่อเรา</div>
    </div>
  );
};

export default TopBar;
