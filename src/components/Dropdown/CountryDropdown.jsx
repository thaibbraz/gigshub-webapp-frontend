import React, { useState } from "react";

const CountryDropdown = ({
  options,
  fieldName,
  handleChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (country) => {
    setSelectedOption(country);
    handleChange(country.name);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-x-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-1xl h-input py-3 px-4 w-full"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-gray-400">
          {(selectedOption &&
            `${selectedOption.flag} ${selectedOption.name}`) ||
            defaultValue ||
            "Options"}
        </span>
        <svg
          className="h-5 w-5 text-gray-400"
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

      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-full origin-top transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition ease-out duration-200"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <p
                key={index}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleOptionClick(option)}
              >
                {option.flag} {option.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
