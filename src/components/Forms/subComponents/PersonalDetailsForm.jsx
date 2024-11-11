import React, { useState } from "react";

const PersonalDetailsForm = ({ onNext }) => {
<<<<<<< HEAD
  const [formData, setFormData] = useState({});
  const [jobTitle, setJobTitle] = useState("software engineer");
  const [location, setLocation] = useState("Spain");
  const [pdfFile, setPdfFile] = useState(null);
  const [resumeText, setResumeText] = useState(null);
=======
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    years_of_experience: "",
    linkedin_url: "",
    github_url: "",
    website: "",
  });
>>>>>>> 1242298 (chore: added website urls to form)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);

    // Create form data to send the file and its name to the backend
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("fileName", file.name);
    try {
      const response = await fetch("http://localhost:8000/upload_resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Update form fields with returned data from the backend
        setFormData({
          jobTitle,
          location,
          "first name": data.resume_data["first name"],
          "last name": data.resume_data["last name"],
          email: data.resume_data.email,
          phone: data.resume_data.phone,
          linkedin: data.resume_data.linkedin || "",
          github: data.resume_data.github || "",
          website: data.resume_data.website || "",
          ethnicity: data.resume_data.ethnicity || "",
          gender: data.resume_data.gender || "",
          lgbtq: data.resume_data.lgbtq || "",
          authorization: data.resume_data.authorization || "",
          sponsorship: data.resume_data.sponsorship || "",
          address: data.resume_data.address || "",
          city: data.resume_data.city || "",
          state: data.resume_data.state || "",
          zip: data.resume_data.zip || "",
          experiences: data.resume_data.experiences.map((exp) => ({
            title: exp.title,
            date: exp.date,
            company: exp.company,
            location: exp.location,
            description: exp.description,
          })),
          education: data.resume_data.education.map((edu) => ({
            degree: edu.degree,
            date: edu.date,
            institution: edu.institution,
          })),
          skills: [
            {
              list: data.resume_data.skills.flatMap((skill) => skill.list),
            },
          ],
          languages:
            data.resume_data.languages.length > 0
              ? data.resume_data.languages.map((lang) => ({
                  language: lang.language || "",
                  level: lang.level || "",
                }))
              : [{ language: "", level: "" }], // Default structure if no languages
          projects: data.resume_data.projects || [],
        });

        // Store resume data in the textarea
        setResumeText(JSON.stringify(data.resume_data, null, 2));
      } else {
        console.error("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (1 / 7) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)]">
          <div className="relative w-12/12 h-3 bg-white rounded-lg mb-6 ml-2">
            <div
              className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full mt-28">
            <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
              Personal Details
            </h2>
<<<<<<< HEAD
            {pdfFile != null && resumeText === null ? (
              <p className="text-center text-sm mb-8 text-dark-purple">
                Retrieving your data ... This process will take a while
              </p>
            ) : (
              <p className="text-center text-sm mb-8 text-dark-purple">
                Please upload your CV
              </p>
            )}
            {pdfFile != null && resumeText !== null ? (
              <p className="text-center text-sm mb-8 text-dark-purple">Done!</p>
            ) : (
              <p className="text-center text-sm mb-8 text-dark-purple"></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Ideal job location
                </label>
                <input
                  name="job_location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Job location"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Job title
                </label>
                <input
                  name="job_title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job title"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
            >
              {/* Add other form fields here */}

              <div className="py-8 pl-2 flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  className="w-auto"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                />
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-4 sm:col-span-2 mc:col-span-1 flex justify-center mt-4">
                <button
                  className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                  type="submit"
                >
                  {pdfFile != null && resumeText === null ? (
                    <button
                      disabled
                      className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5 cursor-not-allowed opacity-50"
                    >
                      <span className="text-sm text-white font-normal">
                        Continue
                      </span>
                    </button>
                  ) : (
=======
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please fill out your personal information
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    First name
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    Last name
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    E-mail
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    LinkedIn
                  </label>
                  <input
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="LinkedIn profile"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    GitHub
                  </label>
                  <input
                    name="github_url"
                    value={formData.github_url}
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

                {/* Submit Button */}
                <div className="lg:col-span-4 sm:col-span-2 mc:col-span-1 flex justify-center mt-4">
                  <button
                    className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                    type="submit"
                  >
>>>>>>> 1242298 (chore: added website urls to form)
                    <div className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5">
                      <span className="text-sm text-white font-normal">
                        Continue
                      </span>
                    </div>
<<<<<<< HEAD
                  )}
                </button>
=======
                  </button>
                </div>
>>>>>>> 1242298 (chore: added website urls to form)
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
