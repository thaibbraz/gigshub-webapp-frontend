import React, { useState, useEffect } from "react";
import EducationRow from "./EducationRow";
import FormLayout from "./FormLayout";
import Button from "./Button";
import ButtonBorder from "./ButtonBorder";
import ButtonContainer from "./ButtonContainer";

const EducationForm = ({ onNext, onBack, data }) => {
  const EMPTY_EDUCATION = {
    id: Date.now(),
    degree: "",
    institution: "",
    date: "",
    major: "",
  };
  const [education, setEducation] = useState(
    data
      ? data.map((ed, index) => ({ ...ed, id: ed.id || index }))
      : [EMPTY_EDUCATION]
  );

  const handleAddEducation = () => {
    setEducation([...education, EMPTY_EDUCATION]);
  };

  const handleDeleteEducation = (id) => {
    setEducation(education.filter((ed) => ed.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducation(
      education.map((ed) => (ed.id === id ? { ...ed, [field]: value } : ed))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onNext({
      education: education
        // keep only rows with data entered
        .filter((e) => e.degree || e.institution || e.major)
        // remove the id
        .map((e) => ({
          degree: e.degree,
          institution: e.institution,
          major: e.major,
          date: e.date,
        })),
    });
  };

  const progress = (4 / 8) * 100;

  return (
    <FormLayout progress={progress}>
      <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
        Education
      </h2>
      <p className="text-center text-sm mb-8 text-dark-purple">
        Please provide details about your education.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto space-y-6"
      >
        {education.map((e) => (
          <EducationRow
            key={e.id}
            formData={e}
            onChange={(field, value) =>
              handleEducationChange(e.id, field, value)
            }
            onDelete={() => handleDeleteEducation(e.id)}
          />
        ))}

        <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
          <button
            type="button"
            onClick={handleAddEducation}
            className="text-light-purple border-pale-purple border-2 rounded-2xl px-3 py-2 hover:bg-pale-purple"
          >
            Add Education
          </button>
        </div>

        <ButtonContainer>
          <ButtonBorder type="button" action={onBack} text="Back" />
          <Button type="submit" action={handleSubmit} text="Continue" />
        </ButtonContainer>
      </form>
    </FormLayout>
  );
};

export default EducationForm;
