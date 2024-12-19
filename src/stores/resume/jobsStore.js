import { create } from 'zustand';

const useJobsStore = create((set) => {
  const persistJobs = (jobs, selectedJob) => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
    localStorage.setItem('selectedJob', JSON.stringify(selectedJob));
    localStorage.setItem('timestamp', Date.now());
  };

  const initializeJobs = () => {
    try {
      const storedJobs = localStorage.getItem('jobs');
      const storedSelectedJob = localStorage.getItem('selectedJob');
      return {
        jobs: storedJobs ? JSON.parse(storedJobs) : { location: '', search_term: '', jobLists: [] },
        selectedJob: storedSelectedJob ? JSON.parse(storedSelectedJob) : null,
      };
    } catch (error) {
      console.error('Failed to retrieve jobs or selectedJob from localStorage:', error);
    }
    return {
      jobs: { location: '', search_term: '', jobLists: [] },
      selectedJob: null,
    };
  };

  const initialState = initializeJobs();

  return {
    jobs: initialState.jobs,
    selectedJob: initialState.selectedJob,

    setJobs: ({ location, search_term, jobLists }) =>
      set((state) => {
        const updatedJobs = { location, search_term, jobLists };
        persistJobs(updatedJobs, state.selectedJob);
        return { jobs: updatedJobs };
      }),

    updateJobList: (site, list) =>
      set((state) => {
        const existingJob = state.jobs.jobLists.find((job) => job.site === site);
        if (existingJob) {
          existingJob.list = list;
        } else {
          state.jobs.jobLists.push({ site, list });
        }
        const updatedJobs = { ...state.jobs };
        persistJobs(updatedJobs, state.selectedJob);
        return { jobs: updatedJobs };
      }),

    setSelectedJob: (job) =>
      set((state) => {
        persistJobs(state.jobs, job);
        return { selectedJob: job };
      }),
  };
});

export default useJobsStore;
