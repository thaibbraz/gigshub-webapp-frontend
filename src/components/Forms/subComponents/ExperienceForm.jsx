import { useState } from "react";
import ExperienceRow from "./ExperienceRow";
import ProgressBar from "./ProgressBar";

const ExperienceForm = ({ onNext, data }) => {
  const EMPTY_EXPERIENCE = {
    id: Date.now(),
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    currentWorkplace: false,
  };
  const [experienceList, setExperienceList] = useState(
    data
      ? data.map((ex, index) => ({ ...ex, id: ex.id || index }))
      : [EMPTY_EXPERIENCE]
  );

  const handleAddExperience = () => {
    setExperienceList([...experienceList, EMPTY_EXPERIENCE]);
  };

  const handleDeleteExperience = (id) => {
    setExperienceList(experienceList.filter((exp) => exp.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperienceList(
      experienceList.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({
      experiences: experienceList
        // keep only rows with data entered
        .filter(
          (e) => e.title || e.company || e.date || e.location || e.description
        )
        // remove the id & format date
        .map((e) => ({
          title: e.title,
          date: `${e.startDate} - ${e.endDate}`,
          company: e.company,
          location: e.location,
          description: e.description,
        })),
    });
  };

  const progress = (5 / 8) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-scroll">
          <ProgressBar progress={progress} />
          <div className="w-full mt-28">
            <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
              Experience
            </h2>
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please provide details of your most relevant work experience.
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl mx-auto space-y-6"
            >
              {experienceList.map((experience, i) => (
                <ExperienceRow
                  key={experience.id}
                  formData={experience}
                  onChange={(field, value) =>
                    handleExperienceChange(experience.id, field, value)
                  }
                  onDelete={() => handleDeleteExperience(experience.id)}
                />
              ))}
              <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="text-light-purple border-pale-purple border-2 rounded-2xl px-3 py-2 hover:bg-pale-purple"
                >
                  Add Experience
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

export default ExperienceForm;
