const ExperienceRow = ({ formData, onChange, onDelete }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange(name, type === "checkbox" ? checked : value);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-x-4 w-full border-b-2 py-4">
      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Company</label>
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Job title</label>
        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job title"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Start date</label>
        <input
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="Month YYYY"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">End date</label>
        <input
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="Month YYYY"
          disabled={formData.currentWorkplace}
          className={`border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue ${
            formData.currentWorkplace ? "bg-gray-200" : ""
          }`}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onDelete}
          className="text-sm text-rose-600 font-bold border border-rose-600 hover:bg-rose-200 rounded-full h-8 w-8 mt-7 flex items-center justify-center"
        >
          x
        </button>
      </div>

      <div className="col-span-4 flex items-center mt-2">
        <input
          type="checkbox"
          name="currentWorkplace"
          checked={formData.currentWorkplace}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-light-liliac text-sm">
          I currently work here
        </label>
      </div>
    </div>
  );
};

export default ExperienceRow;
