import React, { useState, useEffect } from "react";
import axios from "axios";
import { load } from "cheerio"; // Correct import for cheerio

const AIJobMatch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=software+engineer&location=India&f_TPR=r604800&f_SB2=4&f_E=2&f_WT=2&f_JT=F&start=0"
        );

        // Load the HTML response into Cheerio
        const $ = load(data);
        const jobElements = $("li");
        const parsedJobs = jobElements
          .map((index, element) => {
            const job = $(element);
            return {
              position: job.find(".base-search-card__title").text().trim(),
              company: job.find(".base-search-card__subtitle").text().trim(),
              location: job.find(".job-search-card__location").text().trim(),
              datePosted: job.find("time").attr("datetime"),
              jobUrl: job.find(".base-card__full-link").attr("href"),
            };
          })
          .get();

        setJobs(parsedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                {job.position} - {job.company} ({job.location})
              </a>
              <p>Posted on: {job.datePosted}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AIJobMatch;
