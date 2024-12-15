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
        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.707107 6.70711C0.316582 6.31658 0.316582 5.68342 0.707107 5.29289L5.29289 0.707109C5.68342 0.316584 6.31658 0.316584 6.70711 0.707109C7.09763 1.09763 7.09763 1.7308 6.70711 2.12132L2.12132 6.70711C1.7308 7.09763 1.09763 7.09763 0.707107 6.70711Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.707078 0.707108C1.0976 0.316584 1.73077 0.316584 2.12129 0.707108L6.70708 5.29289C7.0976 5.68342 7.0976 6.31658 6.70708 6.70711C6.31655 7.09763 5.68339 7.09763 5.29286 6.70711L0.707078 2.12132C0.316554 1.7308 0.316554 1.09763 0.707078 0.707108Z" fill="white"/></svg>
      </button>
    </div>
  );
};

export default Skill;
