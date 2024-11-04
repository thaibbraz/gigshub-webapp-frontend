import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "test one", name: "test1" },
    { value: "test two", name: "test2" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center gap-x-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue text-gray-400 text-sm"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Options
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      <div
        className={`${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        } absolute right-0 z-10 mt-2 w-56 origin-top-right transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition ease-out duration-200`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          {options.map((o) => (
            <p
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              name={o.name}
              value={o.value}
              id="menu-item-0"
            >
              {o.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
