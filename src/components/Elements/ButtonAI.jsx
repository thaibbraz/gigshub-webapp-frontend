import React from "react";
import starsUnfilled from "../../assets/starsUnfilled.svg";

const ButtonAI = ({ loading, action, text }) => {
  return (
    <button
      onClick={action}
      className={`flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6 lg:mt-0 lg:-mb-5 ml-0 lg:ml-10 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <div className="flex items-center justify-center w-40 h-input bg-dark-blue rounded-2xl border-5">
        <img src={starsUnfilled} alt="Stars Icon" className="mr-2 h-4 w-4" />
        <span className="text-sm text-white font-thin py-6">
          {loading ? "Loading..." : text}
        </span>
      </div>
    </button>
  );
};

export default ButtonAI;
