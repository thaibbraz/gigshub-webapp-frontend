import ProgressBar from "./ProgressBar";

const FormLayout = ({ children, progress }) => {
  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-scroll">
          <ProgressBar progress={progress} />
          <div className="w-full mt-28">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
