import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;                // resp.data = [...]
  if (d && Array.isArray(d.data)) return d.data; // resp.data = { data: [...] }
  if (Array.isArray(resp)) return resp;          // fallback
  return [];
};

export const createCoachesSlice = (set, get) => ({
  coaches: { list: [], loading: false, error: null },

  _setCoaches: (partial) => set(state => ({ coaches: { ...state.coaches, ...partial } })),
  _setCoachesList: (list) => set(state => ({ coaches: { ...state.coaches, list } })),

  // Fetch all coaches
  fetchCoaches: async (opts = {}) => {
    get()._setCoaches({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    try {
      const resp = await api.get(`/coach${q}`);
      const list = extractArray(resp);
      get()._setCoachesList(list);
      get()._setCoaches({ loading: false });
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch coaches failed';
      get()._setCoaches({ loading: false, error: message });
      console.error('fetchCoaches error:', message);
      return { ok: false, error: message };
    }
  },

  // Create a new coach
  createCoach: async (payload) => {
    get()._setCoaches({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.post('/admin/coach', payload)
        : await api.post('/admin/coach', payload);

      set(state => ({ coaches: { ...state.coaches, list: [resp.data, ...state.coaches.list] } }));
      get()._setCoaches({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create coach failed';
      get()._setCoaches({ loading: false, error: message });
      console.error('createCoach error:', message);
      return { ok: false, error: message };
    }
  },

  // Update a coach
  updateCoach: async (id, payload) => {
    get()._setCoaches({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.put(`/admin/coach/${id}`, payload)
        : await api.put(`/admin/coach/${id}`, payload);

      set(state => ({
        coaches: {
          ...state.coaches,
          list: state.coaches.list.map(c => (c._id === id ? resp.data : c))
        }
      }));
      get()._setCoaches({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Update coach failed';
      get()._setCoaches({ loading: false, error: message });
      console.error('updateCoach error:', message);
      return { ok: false, error: message };
    }
  },

  // Delete a coach
  deleteCoach: async (id) => {
    const before = get().coaches.list;
    set(state => ({ coaches: { ...state.coaches, list: state.coaches.list.filter(c => c._id !== id) } }));
    try {
      const resp = await api.delete(`/admin/coach/${id}`);
      return { ok: true, data: resp.data };
    } catch (err) {
      // rollback on failure
      set(state => ({ coaches: { ...state.coaches, list: before } }));
      const message = err?.response?.data?.message || err.message || 'Delete coach failed';
      console.error('deleteCoach error:', message);
      return { ok: false, error: message };
    }
  }
});
