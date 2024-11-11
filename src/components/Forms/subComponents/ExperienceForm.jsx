import { useState } from "react";
import ExperienceRow from "./ExperienceRow";

const ExperienceForm = ({ onNext }) => {
  const [experienceList, setExperienceList] = useState([
    {
      id: Date.now(),
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      currentWorkplace: false,
    },
  ]);

  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        id: Date.now(),
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        currentWorkplace: false,
      },
    ]);
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
    onNext({ experience: experienceList });
  };

  const progress = (4 / 7) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-scroll">
          <div className="relative w-12/12 h-3 bg-white rounded-lg mb-6 ml-2">
            <div
              className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
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
              {experienceList.map((experience) => (
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
