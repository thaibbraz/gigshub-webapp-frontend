export const Section = ({ children, className = "" }) => {
  return (
    <div className="w-full px-9">
      <div className="border-2 border-pale-purple mt-10 rounded-xl">
        <div className="flex justify-between items-center mt-10 mx-10 ">
          {children}
        </div>
      </div>
    </div>
  );
};
