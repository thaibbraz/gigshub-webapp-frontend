import { create } from 'zustand';

const useResumeStore = create((set, get) => ({
  resume: {},
  initializeResume: () => {
    try {
      const storedUser = localStorage.getItem('user');
      const cv = storedUser ? JSON.parse(storedUser).cv || {} : {};
      const currentResume = get().resume;
      if(JSON.stringify(currentResume) !== JSON.stringify(cv)) {
        set({ resume: cv });
      }
    } catch (error) {
      console.error('Failed to initialize resume from localStorage:', error);
    }
  },
  updateResume: (updatedCV) => {
    try {
      const currentResume = get().resume;
      if(JSON.stringify(currentResume) !== JSON.stringify(updatedCV)) {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
          const user = JSON.parse(storedUser);
          user.cv = updatedCV;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          const newUser = { cv: updatedCV };
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        set({ resume: updatedCV });
      }
    } catch (error) {
      console.error('Failed to update resume in localStorage:', error);
    }
  },
}));

export default useResumeStore;
