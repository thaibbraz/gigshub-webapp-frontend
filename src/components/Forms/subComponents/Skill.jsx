const Skill = ({ skill, onDelete }) => {
  return (
    <div
      className="relative flex items-center justify-center bg-soft-liliac rounded-lg py-2 px-4 text-sm h-auto group"
      style={{ minWidth: "fit-content" }}
    >
      <span className="text-xs text-dark-purple">{skill}</span>
      <button
        onClick={() => onDelete(skill)}
        className="absolute top-0 right-0 bg-dark-purple text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: "translate(50%, -50%)" }}
      >
        ×
      </button>
    </div>
  );
};

export default Skill;
