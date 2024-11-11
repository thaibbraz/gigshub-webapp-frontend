const ProjectRow = ({ formData, onChange, onDelete }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_auto] gap-x-4 w-full border-b-2 py-4">
      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project title"
          className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-light-liliac text-sm mb-2">URL</label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Link to your project"
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
      <div className="flex flex-col col-span-2 mt-4">
        <label className="text-light-liliac text-sm mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly describe your project"
          className={`border border-gray-300 rounded-2xl h-18 py-3 px-4 shadow dark-blue`}
        />
      </div>
    </div>
  );
};

export default ProjectRow;
