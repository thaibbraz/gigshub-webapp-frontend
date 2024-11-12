import { useState } from "react";
import ProjectRow from "./ProjectRow";
import ProgressBar from "./ProgressBar";

const ProjectsForm = ({ onNext }) => {
  const EMPTY_PROJECT = {
    id: Date.now(),
    title: "",
    url: "",
    description: "",
  };
  const [projects, setProjects] = useState([EMPTY_PROJECT]);

  const handleAddProject = () => {
    setProjects([...projects, EMPTY_PROJECT]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((exp) => exp.id !== id));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({
      projects: projects.map((p) => `${p.title} ${p.url} ${p.description}`),
    });
  };

  const progress = (7 / 8) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-scroll">
          <ProgressBar progress={progress} />
          <div className="w-full mt-28">
            <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
              Projects
            </h2>
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please share about any of your recent projects.
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto space-y-6"
            >
              {projects.map((p) => (
                <ProjectRow
                  key={p.id}
                  formData={p}
                  onChange={(field, value) =>
                    handleProjectChange(p.id, field, value)
                  }
                  onDelete={() => handleDeleteProject(p.id)}
                />
              ))}
              <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="text-light-purple border-pale-purple border-2 rounded-2xl px-3 py-2 hover:bg-pale-purple"
                >
                  Add Project
                </button>
              </div>
              <div className="lg:col-span-4 flex justify-center mt-4">
                <button
                  type="submit"
                  className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                >
                  <div className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5">
                    <span className="text-sm text-white font-normal">
                      Continue
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
