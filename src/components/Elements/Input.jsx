import React from "react";

const Input = ({ label, handleChange, type, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label className="text-light-liliac text-sm mb-2">{label}</label>
      <input
        type={type ? type : "text"} // default to text input
        placeholder={placeholder ? placeholder : label} // default to label if no placeholder provided
        onChange={(e) => handleChange(e.target.value)}
        className="border border-gray-300 rounded-2xl h-input py-2 px-4 shadow dark-blue"
      />
    </div>
  );
};

export default Input;
