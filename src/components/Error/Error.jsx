import { useState, useEffect } from "react";

const Error = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="border-2 border-rose-600 rounded-lg py-2 px-4 bg-rose-200">
        <p className="text-rose-600">{message}</p>
      </div>
    </div>
  );
};

export default Error;
