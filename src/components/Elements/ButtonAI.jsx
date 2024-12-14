import React from "react";
import starsUnfilled from "../../assets/starsUnfilled.svg";

const ButtonAI = ({ loading, action, text }) => {
  return (
    <button onClick={action} disabled={loading}>
      <div className="flex items-center justify-center w-40 h-input bg-[#3F33C0] border-5">
        <img src={starsUnfilled} alt="Stars Icon" className="mr-2 h-4 w-4" />
        <span className="text-sm text-white font-thin py-6">
          {loading ? "Loading..." : text}
        </span>
      </div>
    </button>
  );
};
export default ButtonAI;
