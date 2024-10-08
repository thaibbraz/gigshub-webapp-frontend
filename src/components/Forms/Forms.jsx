import React, { useState } from "react";
import PersonalDetailsForm from "./subComponents/PersonalDetailsForm";
import ExperienceForm from "./subComponents/ExperienceForm";
import SkillsForm from "./subComponents/SkillsForm";

const Forms = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep((prevStep) => {
      return prevStep + 1;
    });
  };

  return (
    <div>
      {step === 1 && <PersonalDetailsForm onNext={handleNext} />}
      {step === 2 && <ExperienceForm onNext={handleNext} />}
      {step === 3 && <SkillsForm onNext={handleNext} />}
    </div>
  );
};

export default Forms;
