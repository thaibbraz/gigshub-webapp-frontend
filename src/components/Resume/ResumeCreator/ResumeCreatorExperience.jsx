import React, { useState } from "react";

const ResumeCreatorExperience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    },
  ]);

  const [activeTab, setActiveTab] = useState(1);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [name]: value } : exp))
    );
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: experiences.length + 1,
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    setExperiences((prev) => [...prev, newExperience]);
    setActiveTab(newExperience.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Experiences Submitted:", experiences);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap text-nowrap gap-4 mb-6">
        {experiences.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setActiveTab(exp.id)}
            className={`text-sm text-purple ${
              activeTab === exp.id
                ? "font-bold"
                : ""
            }`}
          >
            Experience {exp.id}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {experiences
          .filter((exp) => exp.id === activeTab)
          .map((exp) => (
            <div key={exp.id} className="space-y-4">
              <div>
                <label htmlFor={`role-${exp.id}`} className="text-sm font-bold text-gray-700">
                  WHAT WAS YOUR ROLE AT THE COMPANY?
                </label>
                <input
                  type="text"
                  id={`role-${exp.id}`}
                  name="role"
                  value={exp.role}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Username"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label htmlFor={`company-${exp.id}`} className="text-sm font-bold text-gray-700">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  id={`company-${exp.id}`}
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Username"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label htmlFor={`startDate-${exp.id}`} className="text-sm font-bold text-gray-700">
                    STARTED
                  </label>
                  <input
                    type="date"
                    id={`startDate-${exp.id}`}
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleInputChange(e, exp.id)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  />
                </div>

                <div>
                  <label htmlFor={`endDate-${exp.id}`} className="text-sm font-bold text-gray-700">
                    FINISHED
                  </label>
                  <input
                    type="date"
                    id={`endDate-${exp.id}`}
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleInputChange(e, exp.id)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`location-${exp.id}`} className="text-sm font-bold text-gray-700">
                  WHERE WAS THE COMPANY LOCATED?
                </label>
                <input
                  type="text"
                  id={`location-${exp.id}`}
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Country"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label htmlFor={`description-${exp.id}`} className="text-sm font-bold text-gray-700">
                  WHAT DID YOU DO AT THE COMPANY?
                </label>
                <textarea
                  id={`description-${exp.id}`}
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="• Describe your tasks and achievements"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  rows={4}
                />
              </div>
            </div>
          ))}

        <div className="flex items-center justify-between mt-6">
          <button type="button" onClick={handleAddExperience} className="flex items-center px-3 -mx-3 gap-2 py-2 text-purple">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z" fill="currentColor"/></svg>
            Add new
          </button>
          <button type="submit" className="px-6 py-3 bg-purple text-white rounded-md shadow-md focus:ring">
            Save info
          </button>
        </div>

        <p className="text-xs text-gray-400 text-right mt-3">
          Saved: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </form>
    </div>
  );
};

export default ResumeCreatorExperience;
