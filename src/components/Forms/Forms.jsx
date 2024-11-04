import React, { useState } from "react";
import PersonalDetailsForm from "./subComponents/PersonalDetailsForm";
import EducationForm from "./subComponents/EducationForm";
import ExperienceForm from "./subComponents/ExperienceForm";
import SkillsForm from "./subComponents/SkillsForm";

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
      {step === 2 && <EducationForm onNext={handleNext} />}
      {step === 3 && <ExperienceForm onNext={handleNext} />}
      {step === 4 && <SkillsForm onNext={handleNext} />}
    </div>
  );
};

export default Forms;
