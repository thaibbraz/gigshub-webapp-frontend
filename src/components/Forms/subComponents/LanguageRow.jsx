const LanguageRow = ({ formData, onChange, onDelete }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="flex flew-row justify-center gap-x-4 w-full py-2">
      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Language</label>
        <input
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Level</label>
        <input
          name="level"
          value={formData.level}
          onChange={handleChange}
          placeholder="Level"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
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

export default LanguageRow;
