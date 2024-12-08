import React, { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import FormLayout from "./FormLayout";
import Button from "./Button";
import ButtonBorder from "./ButtonBorder";
import ButtonContainer from "./ButtonContainer";

const LocationForm = ({ onNext, onBack, data }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (3 / 8) * 100;

  return (
    <FormLayout progress={progress}>
      <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
        Location
      </h2>
      <p className="text-center text-sm mb-8 text-dark-purple">
        Please fill out your location information
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Postal code
            </label>
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Postal code"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Do you have the legal right to work in your country?
            </label>
            <Dropdown
              options={["Yes", "No"]}
              handleChange={handleChange}
              fieldName={"authorization"}
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Will you require visa sponsorship?
            </label>
            <Dropdown
              options={["Yes", "No"]}
              handleChange={handleChange}
              fieldName={"sponsorship"}
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
            />
          </div>
        </div>

        <ButtonContainer>
          <ButtonBorder type="button" action={onBack} text="Back" />
          <Button type="submit" action={handleSubmit} text="Continue" />
        </ButtonContainer>
      </form>
    </FormLayout>
  );
};

export default LocationForm;
