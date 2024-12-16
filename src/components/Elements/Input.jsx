import React from "react";

const Input = ({ label, handleChange, type, placeholder }) => {
  return (
    <div className="flex">
      <input
        type={type ? type : "text"} // default to text input
        placeholder={placeholder ? placeholder : label} // default to label if no placeholder provided
        onChange={(e) => handleChange(e.target.value)}
        className="border border-gray-300 rounded-1xl h-input px-4"
      />
    </div>
  );
};

export default Input;
