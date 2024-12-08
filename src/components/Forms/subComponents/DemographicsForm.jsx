import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown/Dropdown";
import FormLayout from "./FormLayout";
import Button from "./Button";
import ButtonBorder from "./ButtonBorder";
import ButtonContainer from "./ButtonContainer";

const DemographicsForm = ({ onNext, onBack, data, handleSubmit }) => {
  const INITIAL_FORM = {
    gender: data.gender || "",
    ethnicity: data.ethnicity || "",
    veteran_status: data.veteran_status || "",
    disability_status: data.disability_status || "",
    lgbtq: data.lgbtq || "",
  };
  const [formData, setFormData] = useState(INITIAL_FORM);
  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to disclose",
  ];

  const lgbtOptions = [
    "Heterosexual (Straight)",
    "Gay or Lesbian",
    "Bisexual",
    "Asexual",
    "Pansexual",
    "Queer",
    "Other",
    "Prefer not to disclose",
  ];

  const ethnicityOptions = [
    "Hispanic or Latino",
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or More Races",
  ];

  const veteranOptions = [
    "I am a protected veteran",
    "I am not a protected veteran",
    "I do not wish to disclose my veteran status",
  ];

  const disabilityOptions = [
    "Yes, I have a disability (or previously had one)",
    "No, I do not have a disability",
    "I do not wish to answer",
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    onNext(formData);
    handleSubmit();
    navigate("/dashboard");
  };

  const progress = (8 / 8) * 100;

  return (
    <FormLayout progress={progress}>
      <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
        Demographics
      </h2>
      <p className="text-center text-sm mb-8 text-dark-purple">
        Some employers request this information. It is optional.
      </p>

      <form
        onSubmit={handleConfirm}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
      >
        <div className="flex flex-col">
          <label className="text-light-liliac text-sm mb-2">Gender</label>
          <Dropdown
            options={genderOptions}
            fieldName="gender"
            defaultValue={formData.gender}
            handleChange={handleChange}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-light-liliac text-sm mb-2">
            Race or Ethnicity
          </label>
          <Dropdown
            options={ethnicityOptions}
            fieldName="ethnicity"
            defaultValue={formData.ethnicity}
            handleChange={handleChange}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-light-liliac text-sm mb-2">
            Veteran status
          </label>
          <Dropdown
            options={veteranOptions}
            fieldName="veteran_status"
            defaultValue={formData.veteran_status}
            handleChange={handleChange}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-light-liliac text-sm mb-2">
            Disability status
          </label>
          <Dropdown
            options={disabilityOptions}
            fieldName="disability_status"
            defaultValue={formData.disability_status}
            handleChange={handleChange}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-light-liliac text-sm mb-2">
            Sexual orientation
          </label>
          <Dropdown
            options={lgbtOptions}
            fieldName="lgbtq"
            defaultValue={formData.lgbtq}
            handleChange={handleChange}
            className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
          />
        </div>

        <ButtonContainer>
          <ButtonBorder type="button" action={onBack} text="Back" />
          <Button type="submit" action={handleSubmit} text="Submit" />
        </ButtonContainer>
      </form>
    </FormLayout>
  );
};

export default DemographicsForm;
