import React, { useState } from "react";
import FormLayout from "./FormLayout";
import ButtonFill from "../../Elements/ButtonFill";
import ButtonBorder from "../../Elements/ButtonBorder";
import ButtonContainer from "./ButtonContainer";

const PersonalDetailsForm = ({ onNext, onBack, data }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (2 / 8) * 100;

  return (
    <FormLayout progress={progress}>
      <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
        Personal Details
      </h2>

      <p className="text-center text-sm mb-8 text-dark-purple">
        Please fill out your personal information
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">First name</label>
            <input
              name="first name"
              value={formData["first name"]}
              onChange={handleChange}
              placeholder="First name"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Last name</label>
            <input
              name="last name"
              value={formData["last name"]}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">LinkedIn</label>
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn profile"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">GitHub</label>
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub profile"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Portfolio website
            </label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Portfolio website"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <ButtonContainer>
            <ButtonBorder type="button" action={onBack} text="Back" />
            <ButtonFill type="submit" action={handleSubmit} text="Continue" />
          </ButtonContainer>
        </div>
      </form>
    </FormLayout>
  );
};

export default PersonalDetailsForm;
