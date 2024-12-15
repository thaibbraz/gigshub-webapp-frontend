import { create } from 'zustand';

const useResumeStore = create((set, get) => ({
  resume: {},

  // Initialize resume from localStorage
  initializeResume: () => {
    try {
      const storedUser = localStorage.getItem('user');
      const cv = storedUser ? JSON.parse(storedUser).cv || {} : {};
      const currentResume = get().resume;

      // Only update if the resume is actually different
      if (JSON.stringify(currentResume) !== JSON.stringify(cv)) {
        set({ resume: cv });
      }
    } catch (error) {
      console.error('Failed to initialize resume from localStorage:', error);
    }
  },

  // Update resume in the store and localStorage
  updateResume: (updatedCV) => {
    try {
      const currentResume = get().resume;

      // Only update if the new data is different
      if (JSON.stringify(currentResume) !== JSON.stringify(updatedCV)) {
        // Update localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          user.cv = updatedCV;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          const newUser = { cv: updatedCV };
          localStorage.setItem('user', JSON.stringify(newUser));
        }

        // Update Zustand state
        set({ resume: updatedCV });
      }
    } catch (error) {
      console.error('Failed to update resume in localStorage:', error);
    }
  },
}));

export default useResumeStore;
