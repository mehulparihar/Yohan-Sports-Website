import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;
  if (d && Array.isArray(d.data)) return d.data;
  if (Array.isArray(resp)) return resp;
  return [];
};

export const createVenuesSlice = (set, get) => ({
  venues: { list: [], loading: false, error: null },

  _setVenues: (partial) => set(state => ({ venues: { ...state.venues, ...partial } })),
  _setVenuesList: (list) => set(state => ({ venues: { ...state.venues, list } })),

  fetchVenues: async (opts = {}) => {
    get()._setVenues({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    try {
      const resp = await api.get(`/venues${q}`);
      const list = extractArray(resp);
      get()._setVenuesList(list);
      get()._setVenues({ loading: false });
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch venues failed';
      get()._setVenues({ loading: false, error: message });
      console.error('fetchVenues error:', message);
      return { ok: false, error: message };
    }
  },

  createVenue: async (payload) => {
    get()._setVenues({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.post('/admin/venues', payload)
        : await api.post('/admin/venues', payload);

      set(state => ({ venues: { ...state.venues, list: [resp.data, ...state.venues.list] } }));
      get()._setVenues({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create venue failed';
      get()._setVenues({ loading: false, error: message });
      console.error('createVenue error:', message);
      return { ok: false, error: message };
    }
  },

  updateVenue: async (id, payload) => {
    get()._setVenues({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.put(`/admin/venues/${id}`, payload)
        : await api.put(`/admin/venues/${id}`, payload);

      set(state => ({
        venues: {
          ...state.venues,
          list: state.venues.list.map(v => (v._id === id ? resp.data : v))
        }
      }));
      get()._setVenues({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Update venue failed';
      get()._setVenues({ loading: false, error: message });
      console.error('updateVenue error:', message);
      return { ok: false, error: message };
    }
  },

  deleteVenue: async (id) => {
    const before = get().venues.list;
    set(state => ({ venues: { ...state.venues, list: state.venues.list.filter(v => v._id !== id) } }));
    try {
      const resp = await api.delete(`/admin/venues/${id}`);
      return { ok: true, data: resp.data };
    } catch (err) {
      set(state => ({ venues: { ...state.venues, list: before } }));
      const message = err?.response?.data?.message || err.message || 'Delete venue failed';
      console.error('deleteVenue error:', message);
      return { ok: false, error: message };
    }
  }
});
