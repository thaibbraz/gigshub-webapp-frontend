const Button = ({ type, action, text }) => {
  return (
    <button
      className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
      onClick={action}
      type={type}
    >
      <div className="flex items-center justify-center w-buttonSize h-input rounded-2xl border-5">
        <span className="text-sm text-dark-blue border-dark-blue font-normal">
          {text}
        </span>
      </div>
    </button>
  );
};

export default Button;
