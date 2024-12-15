export const uploadResume = async file => {
  if(file) {
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

      if(response.ok) {
        const data = await response.json();
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.uid;
        const newUserData = {
          uid: userId,
          email: user?.email || "",
          displayName: user?.displayName || "",
          photoURL: user?.photoURL || "",
          cv: {
            first_name: data.resume_data["first name"],
            last_name: data.resume_data["last name"],
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
              { list: data.resume_data.skills.flatMap((skill) => skill.list) },
            ],
            languages:
              data.resume_data.languages.length > 0
                ? data.resume_data.languages.map((lang) => ({
                    language: lang.language || "",
                    level: lang.level || "",
                  }))
                : [{ language: "", level: "" }],
            projects: data.resume_data.projects || [],
          }
        };
        localStorage.setItem("user", JSON.stringify(newUserData));

        return newUserData;

        //navigate("/resume/edit");
      } else {
        console.error("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
}