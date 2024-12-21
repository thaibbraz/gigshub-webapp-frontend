import { create } from 'zustand';
import { getUserCVData, addUserData } from '../../utils/firebase';

const useResumeStore = create((set, get) => ({
  resume: {},
  loadingResume: false,
  setLoading: (loading) => set({ loadingResume: loading }),

  initializeResume: async (userId) => {
    try {
      get().setLoading(true);
      const storedUser = localStorage.getItem('user');
      let cv = {};
      userId = userId || JSON.parse(localStorage.getItem('user'))?.uid;
      if (userId) {
        const fetchedCV = await getUserCVData(userId);
        cv = fetchedCV || {};
      } else if (storedUser) {
        cv = JSON.parse(storedUser).cv || {};
      }

      console.log(cv);
      const currentResume = get().resume;
      if (JSON.stringify(currentResume) !== JSON.stringify(cv)) {
        set({ resume: cv });
      }
    } catch (error) {
      console.error('Failed to initialize resume:', error);
    } finally {
      get().setLoading(false);
    }
  },

  updateResume: async (updatedCV) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.uid || null;
    try {
      get().setLoading(true);
      const currentResume = get().resume;
      if(JSON.stringify(currentResume) !== JSON.stringify(updatedCV)) {
        if(userId) {
          await addUserData(userId, { cv: updatedCV });
        }
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
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
      console.error('Failed to update resume:', error);
    } finally {
      get().setLoading(false);
    }
  },
}));

export default useResumeStore;
