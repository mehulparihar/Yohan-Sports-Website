import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createProgramsSlice } from './slices/programsSlice';
import { createEventsSlice } from './slices/eventsSlice';
import { createVenuesSlice } from './slices/venuesSlice';
import { createCoachesSlice } from './slices/coachesSlice';
import { createEnquiriesSlice } from './slices/enquiriesSlice';
import { createBlogSlice } from './slices/blogSlice';

const useStore = create(
  devtools(
    persist(
      (set, get, api) => ({
        // compose slices
        ...createAuthSlice(set, get, api),
        ...createProgramsSlice(set, get, api),
        ...createEventsSlice(set, get, api),
        ...createVenuesSlice(set, get, api),
        ...createCoachesSlice(set, get, api),
        ...createEnquiriesSlice(set, get, api),
        ...createBlogSlice(set, get, api),

        // basic UI
        ui: { globalLoading: false },
        setGlobalLoading: (v) => set(state => ({ ui: { ...state.ui, globalLoading: v } }))
      }),
      {
        name: 'sg-store',
        partialize: (state) => ({ auth: state.auth }) // persist only auth
      }
    )
  )
);

export default useStore;