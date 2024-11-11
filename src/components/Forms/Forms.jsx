import React, { useState } from "react";
import PersonalDetailsForm from "./subComponents/PersonalDetailsForm";
import LocationForm from "./subComponents/LocationForm";
import EducationForm from "./subComponents/EducationForm";
import ExperienceForm from "./subComponents/ExperienceForm";
import SkillsForm from "./subComponents/SkillsForm";
import ProjectsForm from "./subComponents/ProjectsForm";
import DemographicsForm from "./subComponents/DemographicsForm";

const Forms = ({ formData, onSetFormData }) => {
  const [step, setStep] = useState(1);

  const handleNext = (data) => {
    onSetFormData({ ...formData, ...data });
    setStep((prevStep) => {
      return prevStep + 1;
    });
  };

  return (
    <div>
      {step === 1 && <PersonalDetailsForm onNext={handleNext} />}
      {step === 2 && <LocationForm onNext={handleNext} />}
      {step === 3 && <EducationForm onNext={handleNext} />}
      {step === 4 && <ExperienceForm onNext={handleNext} />}
      {step === 5 && <SkillsForm onNext={handleNext} />}
      {step === 6 && <ProjectsForm onNext={handleNext} />}
      {step === 7 && <DemographicsForm onNext={handleNext} />}
    </div>
  );
};

export default Forms;
