import Dropdown from "../../Dropdown/Dropdown";

const EducationRow = ({ formData, onChange, onDelete }) => {
  const degreeOptions = [
    "High school diploma",
    "4-year university degree",
    "Post-graduate degree",
    "Technical certification",
  ];
  const fieldName = "degree";

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-x-4 gap-y-4 w-full border-b-2 py-4">
      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Degree</label>
        {formData.degree ? (
          <input
            type="text"
            value={formData.degree}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
          />
        ) : (
          <Dropdown
            options={degreeOptions}
            handleChange={handleChange}
            fieldName={fieldName}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
          />
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">
          Institution name
        </label>
        <input
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Institution name"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Field of study</label>
        <input
          name="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="Field of study"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">
          Graduation year
        </label>
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Month YYYY"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
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
    </div>
  );
};

export default EducationRow;
