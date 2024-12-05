const ButtonContainer = ({ children }) => {
  return (
    <div className="lg:col-span-4 sm:col-span-2 mc:col-span-1 flex gap-4 justify-center mt-4">
      {children}
    </div>
  );
};

export default ButtonContainer;
