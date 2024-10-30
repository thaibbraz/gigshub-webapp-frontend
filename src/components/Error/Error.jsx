import { useState, useEffect } from "react";

const Error = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="border-2 border-rose-600 rounded-lg py-2 px-4 my-6 mx-auto bg-rose-200">
        <p className="text-rose-600">{message}</p>
      </div>
    </div>
  );
};

export default Error;
