import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { getUserCVData, addUserData } from "../../utils/firebase.js";

const Resume = () => {
  const navigate = useNavigate();
  const [cvData, setcvData] = useState();
  const options = [
    {
      title: "From Scratch",
      description:
        "Use this option to build a new resume using our easy flow section by section",
      href: "/resume/edit",
    },
    {
      title: "Import your existing resume",
      description:
        "We'll fetch your data and autofill our resume builder tool, so you can review and edit any info.",
      action: "upload",
    },
  ];

  const fetchCV = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      const data = await getUserCVData(userId);
      if (data) {
        navigate("/resume/edit");
      } else {
        console.log("No CV data found for the user.");
      }
    } catch (error) {
      console.error("Error fetching CV data:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("pdfFile", file);
        formData.append("fileName", file.name);

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/upload_resume`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setcvData({
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
              title: exp.title || "",
              date: exp.date || "",
              company: exp.company || "",
              location: exp.location || "",
              description: exp.description || "",
            })),
            education: data.resume_data.education.map((edu) => ({
              degree: edu.degree || "",
              date: edu.date || "",
              institution: edu.institution || "",
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
                : [{ language: "", level: "" }],
            projects: data.resume_data.projects || [],
          });
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user?.uid;
          const newUserData = {
            uid: userId,
            email: user?.email || "",
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
            cv: cvData, //here's when we'll save the cv for the first time
          };
          localStorage.setItem("user", JSON.stringify(newUserData));
          localStorage.setItem("cv", JSON.stringify(cvData));
          await addUserData(userId, newUserData);

          //navigate("/resume/edit");
        } else {
          console.error("Failed to upload resume");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-[1496px] bg-white rounded-lg overflow-hidden">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold mb-6">
          How would you like to create your resume?
        </h1>
        <div className="space-y-4 w-full max-w-md">
          {options.map((option, index) =>
            option.action === "upload" ? (
              <label
                key={index}
                htmlFor="file-upload"
                className="w-full block text-start py-4 px-6 bg-white rounded-lg border border-gray-300 hover:border-purple focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <h2 className="text-md font-bold mb-1">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            ) : (
              <button
                key={index}
                className="w-full text-start py-4 px-6 bg-white rounded-lg border border-gray-300 hover:border-purple focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => navigate(option.href)}
              >
                <h2 className="text-md font-bold mb-1">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
