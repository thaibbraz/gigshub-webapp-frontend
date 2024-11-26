import React from "react";

const Button = ({ type, action, text }) => {
  return (
    <button
      className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
      onClick={action}
      type={type}
    >
      <div className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5">
        <span className="text-sm text-white font-normal">{text}</span>
      </div>
    </button>
  );
};

export default Button;
