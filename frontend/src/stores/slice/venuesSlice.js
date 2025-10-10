import { API } from '../api';

export const createVenuesSlice = (set, get) => ({
  venues: { list: [], loading: false, error: null },

  _setVenues: (partial) => set(state => ({ venues: { ...state.venues, ...partial } })),
  _setVenuesList: (list) => set(state => ({ venues: { ...state.venues, list } })),

  fetchVenues: async (opts = {}) => {
    get()._setVenues({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    const resp = await API.request(`/venues${q}`);
    if (!resp.ok) { get()._setVenues({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    get()._setVenuesList(resp.data || []);
    get()._setVenues({ loading: false });
    return { ok: true, data: resp.data };
  },

  createVenue: async (payload) => {
    get()._setVenues({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request('/admin/venues', { method: 'POST', body: payload, raw: isForm });
      if (!resp.ok) { get()._setVenues({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ venues: { ...state.venues, list: [resp.data, ...state.venues.list] } }));
      get()._setVenues({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setVenues({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  updateVenue: async (id, payload) => {
    get()._setVenues({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request(`/admin/venues/${id}`, { method: 'PUT', body: payload, raw: isForm });
      if (!resp.ok) { get()._setVenues({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ venues: { ...state.venues, list: state.venues.list.map(v => (v._id === id ? resp.data : v)) } }));
      get()._setVenues({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setVenues({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  deleteVenue: async (id) => {
    const before = get().venues.list;
    set(state => ({ venues: { ...state.venues, list: state.venues.list.filter(v => v._id !== id) } }));
    const resp = await API.request(`/admin/venues/${id}`, { method: 'DELETE' });
    if (!resp.ok) { set(state => ({ venues: { ...state.venues, list: before } })); return { ok: false, error: resp.data || resp.status }; }
    return { ok: true, data: resp.data };
  }
});