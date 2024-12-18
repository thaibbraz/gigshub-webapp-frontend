import { create } from 'zustand';

const useJobsStore = create((set) => {
  const persistJobs = (jobs) => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
    localStorage.setItem('timestamp', Date.now());
  };

  const initializeJobs = () => {
    try {
      const storedJobs = localStorage.getItem('jobs');
      if(storedJobs) {
        return JSON.parse(storedJobs);
      }
    } catch (error) {
      console.error('Failed to retrieve jobs from localStorage:', error);
    }
    return { location: '', search_term: '', jobLists: [] };
  };

  return {
    jobs: initializeJobs(),
    setJobs: ({ location, search_term, jobLists }) =>
      set((state) => {
        const updatedJobs = { location, search_term, jobLists };
        persistJobs(updatedJobs);
        return { jobs: updatedJobs };
      }),
    updateJobList: (site, list) =>
      set((state) => {
        const existingJob = state.jobs.jobLists.find((job) => job.site === site);
        if(existingJob) {
          existingJob.list = list;
        } else {
          state.jobs.jobLists.push({ site, list });
        }
        const updatedJobs = { ...state.jobs };
        persistJobs(updatedJobs);
        return { jobs: updatedJobs };
      }),
  };
});

export default useJobsStore;