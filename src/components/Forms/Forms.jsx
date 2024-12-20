import React, { useState } from "react";
import CVUpload from "./subComponents/CVUpload";
import PersonalDetailsForm from "./subComponents/PersonalDetailsForm";
import LocationForm from "./subComponents/LocationForm";
import EducationForm from "./subComponents/EducationForm";
import ExperienceForm from "./subComponents/ExperienceForm";
import SkillsForm from "./subComponents/SkillsForm";
import ProjectsForm from "./subComponents/ProjectsForm";
import DemographicsForm from "./subComponents/DemographicsForm";
import { sendRequest } from "../../utils/api.js";
import { database, ref, set } from "../../utils/firebase.js";
const Forms = ({ formData, onSetFormData }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = (data) => {
    onSetFormData({ ...formData, ...data });
    setStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedFields = {};
      for (let field in formData) {
        if (formData[field]) {
          updatedFields[field] = formData[field];
        }
      }
      localStorage.setItem("formData", JSON.stringify(updatedFields));
      //await sendRequest(updatedFields, "/client-info");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && <CVUpload onNext={handleNext} />}

      {step === 2 && (
        <PersonalDetailsForm
          onNext={handleNext}
          onBack={handleBack}
          data={{
            "first name": formData["first name"],
            "last name": formData["last name"],
            email: formData.email,
            phone: formData.phone,
            linkedin: formData.linkedin,
            github: formData.github,
            website: formData.website,
          }}
        />
      )}

      {step === 3 && (
        <LocationForm
          onNext={handleNext}
          onBack={handleBack}
          data={{
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zip: formData.zip,
            authorization: formData.authorization,
            sponsorship: formData.sponsorship,
          }}
        />
      )}
      {step === 4 && (
        <EducationForm
          onNext={handleNext}
          onBack={handleBack}
          data={formData.education}
        />
      )}
      {step === 5 && (
        <ExperienceForm
          onNext={handleNext}
          onBack={handleBack}
          data={formData.experiences}
        />
      )}
      {step === 6 && (
        <SkillsForm
          onNext={handleNext}
          onBack={handleBack}
          skillsData={formData.skills ? formData.skills[0].list : []}
          languageData={formData.languages ? formData.languages : []}
        />
      )}
      {step === 7 && (
        <ProjectsForm
          onNext={handleNext}
          onBack={handleBack}
          data={formData.projects}
        />
      )}
      {step === 8 && (
        <DemographicsForm
          onNext={handleNext}
          onBack={handleBack}
          handleSubmit={handleSubmit}
          data={{
            ethnicity: formData.ethnicity,
            gender: formData.gender,
            lgbtq: formData.lgbtq,
          }}
        />
      )}
    </div>
  );
};

export default Forms;
