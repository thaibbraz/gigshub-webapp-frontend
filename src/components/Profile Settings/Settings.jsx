import React, { useState } from "react";
import editIcon from "../../assets/editIcon.svg";
import { format } from "date-fns";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    firstName: "Giulia",
    lastName: "Cellerino",
    email: "giulia.cellerino@icloud.com",
    password: "mammamia",
    phone: "+39 3000000000",
    city: "Barcelona",
    country: "Spain",
    education: "BBA",
    experience: "2",
  });

  const [experienceInformation, setExperienceInformation] = useState({
    company: "CodeOp",
    jobTitle: "Full Stack Developer",
    startDate: "22-11-2020",
    endDate: "03-09-2024",
    currentWorkplace: false,
  });

  const [skillsInformation, setSkillsInformation] = useState({
    one: "React",
    two: "Vue",
    three: "Agile",
    four: "NodeJS",
    five: "Express",
    six: "Docker",
    seven: "AWS",
    eight: "mySQL",
    nine: "MongoDB",
    ten: "Azure",
  });

  const [accountSettings, setAccountSettings] = useState({
    planType: "Free",
    billingType: "Annually",
    annualPrice: "$ 0,00",
    creditCardInfo: "**** **** **** ****",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
  };

  const handleChangePersonal = (e) => {
    const { name, value } = e.target;
    setPersonalInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleChangeExperience = (e) => {
    const { name, value } = e.target;
    setExperienceInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleChangeSkills = (e) => {
    const { name, value } = e.target;
    setSkillsInformation((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    if (experienceInformation.currentWorkplace) {
      const today = format(new Date(), "dd-MM-yyyy");
      setExperienceInformation((prevInfo) => ({
        ...prevInfo,
        currentWorkplace: false,
        endDate: today,
      }));
    } else {
      setExperienceInformation((prevInfo) => ({
        ...prevInfo,
        currentWorkplace: true,
        endDate: "",
      }));
    }
  };

  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="ml-2 mr-10">
      <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto overflow-y-auto">
        {/* Profile Information Section */}
        <div className="w-full px-9">
          <div className="border-2 border-pale-purple mt-10 rounded-xl">
            <div className="flex justify-between items-center mt-10 mx-10 ">
              <p className="text-dark-blue text-2xl font-extrabold">
                Your Profile Information
              </p>
              <div className="flex items-center mr-2">
                <p className="text-dark-blue mr-4 hidden md:block">
                  Click here to edit:
                </p>
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleEditClick}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 p-10 items-center justify-center">
              <div className="col-span-4 grid grid-cols-4 gap-6">
                {["firstName", "lastName", "email", "password"].map((field) => (
                  <div
                    key={field}
                    className={`flex flex-col items-center justify-center text-center rounded-lg p-4 ${
                      isEditing ? "bg-gray-200" : "bg-pale-purple"
                    }`}
                  >
                    <p className="text-dark-blue text-md sm:text-sm md:text-lg font-bold hidden md:block">
                      {formatFieldName(field)}
                    </p>
                    <input
                      type={field === "password" ? "password" : "text"}
                      name={field}
                      value={personalInformation[field]}
                      onChange={handleChangePersonal}
                      onBlur={handleBlur}
                      disabled={!isEditing}
                      className="text-dark-blue text-xs sm:text-sm md:text-md bg-transparent text-center focus:outline-none w-full h-auto break-words"
                      style={{ minHeight: "2.5rem" }}
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-5 grid grid-cols-5 gap-6 mt-6 text-sm">
                {["phone", "city", "country", "education", "experience"].map(
                  (field) => (
                    <div
                      key={field}
                      className={`flex flex-col items-center justify-center text-center rounded-lg p-4 ${
                        isEditing ? "bg-gray-200" : "bg-pale-purple"
                      }`}
                    >
                      <p className="text-dark-blue text-xs sm:text-sm md:text-lg font-bold hidden md:block">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </p>
                      <input
                        type="text"
                        name={field}
                        value={personalInformation[field]}
                        onChange={handleChangePersonal}
                        onBlur={handleBlur}
                        disabled={!isEditing}
                        className="text-dark-blue text-xs sm:text-sm md:text-md bg-transparent text-center focus:outline-none w-full h-auto break-words"
                        style={{ minHeight: "2.5rem" }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Details Section */}
        <div className="w-full px-9 mt-8">
          <div className="border-2 border-pale-purple rounded-xl">
            <div className="flex justify-between items-center mt-10 mx-10">
              <p className="text-dark-blue text-2xl font-extrabold">
                Experience Information
              </p>
            </div>
            <div className="grid grid-cols-5 gap-6 p-10 items-center justify-center">
              <div className="col-span-5 grid grid-cols-5 gap-6">
                {["company", "jobTitle", "startDate", "endDate"].map(
                  (field) => (
                    <div
                      key={field}
                      className={`flex flex-col items-center justify-center text-center rounded-lg p-4 ${
                        isEditing ? "bg-gray-200" : "bg-pale-purple"
                      }`}
                    >
                      <p className="text-dark-blue text-lg font-bold hidden md:block">
                        {formatFieldName(field)}
                      </p>
                      <input
                        type="text"
                        name={field}
                        value={experienceInformation[field]}
                        onChange={handleChangeExperience}
                        onBlur={handleBlur}
                        disabled={
                          !isEditing ||
                          (field === "endDate" &&
                            experienceInformation.currentWorkplace)
                        }
                        className={`text-dark-blue text-xs sm:text-sm md:text-md bg-transparent text-center focus:outline-none w-full h-auto break-words ${
                          experienceInformation.currentWorkplace &&
                          field === "endDate"
                            ? "opacity-50"
                            : ""
                        }`}
                        style={{ minHeight: "2.5rem" }}
                      />
                    </div>
                  )
                )}
                <div className="flex flex-col items-center justify-center text-center rounded-lg p-4">
                  <p className="text-dark-blue text-lg font-bold hidden md:block">
                    Current Job?
                  </p>
                  <input
                    type="checkbox"
                    name="currentWorkplace"
                    checked={experienceInformation.currentWorkplace}
                    onChange={handleCheckboxChange}
                    className="text-dark-blue text-xs sm:text-sm md:text-md bg-transparent text-center focus:outline-none w-full h-auto break-words"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="w-full px-9 mt-8">
          <div className="border-2 border-pale-purple rounded-xl">
            <div className="flex justify-between items-center mt-8 mx-10">
              <p className="text-dark-blue text-2xl font-extrabold">Skills</p>
            </div>
            <div className="grid grid-cols-5 gap-6 p-10 items-center justify-center">
              {Object.keys(skillsInformation).map((skill) => (
                <div
                  key={skill}
                  className={`flex flex-col items-center justify-center text-center rounded-lg p-4 ${
                    isEditing ? "bg-gray-200" : "bg-pale-purple "
                  }`}
                >
                  <p className="text-dark-blue text-lg font-bold"></p>
                  <input
                    type="text"
                    name={skill}
                    value={skillsInformation[skill]}
                    onChange={handleChangeSkills}
                    onBlur={handleBlur}
                    disabled={!isEditing}
                    className="text-dark-blue text-md bg-transparent text-center focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="grid grid-cols-2 gap-8 mt-8 w-full px-9 pb-9 h-full">
          <div className="border-2 border-pale-purple rounded-xl col-span-2">
            <p className="mt-8 mx-10 text-dark-blue text-2xl font-extrabold">
              Account Settings
            </p>
            <div className="grid grid-cols-5 gap-6 pt-10 px-10 pb-8 items-center justify-center">
              <div className="col-span-5 grid grid-cols-5 gap-6">
                {[
                  "planType",
                  "billingType",
                  "annualPrice",
                  "creditCardInfo",
                ].map((field) => (
                  <div
                    key={field}
                    className={
                      "flex flex-col items-center justify-center text-center rounded-lg bg-lime-200 h-auto"
                    }
                  >
                    {/* Label - hidden on small and sm screens */}
                    <p className="text-dark-blue text-lg font-bold hidden md:block">
                      {formatFieldName(field)}
                    </p>
                    {/* Display the account setting value with word wrapping */}
                    <p className="text-dark-blue text-xs sm:text-sm md:text-md text-center break-words">
                      {accountSettings[field]}
                    </p>
                  </div>
                ))}

                {/* Delete Account Button */}
                <div className="flex flex-col items-center justify-center text-center rounded-lg p-4">
                  {/* Delete Account Button - visible only on large and larger screens */}
                  <button
                    className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-red-600 w-40 h-10  hidden md:hidden lg:flex"
                    type="button"
                  >
                    <div className="flex items-center justify-center w-40 h-10 bg-red-600 rounded-2xl border-5">
                      <span className="text-sm text-white font-normal">
                        Delete Account
                      </span>
                    </div>
                  </button>

                  {/* X Button - visible on medium and smaller screens */}
                  <button
                    className="block lg:hidden text-red-600 text-2xl"
                    type="button"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
