import React, { useState } from "react";
import PersonalDetailsForm from "./subComponents/PersonalDetailsForm";
import ExperienceForm from "./subComponents/ExperienceForm";
import SkillsForm from "./subComponents/SkillsForm";

const Forms = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    console.log("Data received in handleNext:", data); // Log received data
    console.log("Current step before increment:", step); // Log current step
    setFormData({ ...formData, ...data });
    setStep((prevStep) => {
      console.log("Next step after increment:", prevStep + 1); // Log next step
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
