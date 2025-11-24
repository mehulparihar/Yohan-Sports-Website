import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;                // resp.data = [...]
  if (d && Array.isArray(d.data)) return d.data; // resp.data = { data: [...] }
  if (Array.isArray(resp)) return resp;          // fallback
  return [];
};

export const createEventsSlice = (set, get) => ({
  events: { list: [], loading: false, error: null },

  _setEvents: (partial) => set(state => ({ events: { ...state.events, ...partial } })),
  _setEventsList: (list) => set(state => ({ events: { ...state.events, list } })),

  // Fetch all events
  fetchEvents: async (opts = {}) => {
    get()._setEvents({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    try {
      const resp = await api.get(`/events${q}`);
      const list = extractArray(resp);
      get()._setEventsList(list);
      get()._setEvents({ loading: false });
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch events failed';
      get()._setEvents({ loading: false, error: message });
      console.error('fetchEvents error:', message);
      return { ok: false, error: message };
    }
  },

  // Create a new event
  createEvent: async (payload) => {
    get()._setEvents({ loading: true, error: null });
    try {

      const resp = payload instanceof FormData
        ? await api.post('/admin/events', payload)
        : await api.post('/admin/events', payload);


      set(state => ({ events: { ...state.events, list: [resp.data, ...state.events.list] } }));
      get()._setEvents({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create event failed';
      get()._setEvents({ loading: false, error: message });
      console.error('createEvent error:', message);
      return { ok: false, error: message };
    }
  },

  // Update an event
  updateEvent: async (id, payload) => {
    get()._setEvents({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.put(`/admin/events/${id}`, payload)
        : await api.put(`/admin/events/${id}`, payload);

      set(state => ({
        events: {
          ...state.events,
          list: state.events.list.map(e => (e._id === id ? resp.data : e))
        }
      }));
      get()._setEvents({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Update event failed';
      get()._setEvents({ loading: false, error: message });
      console.error('updateEvent error:', message);
      return { ok: false, error: message };
    }
  },

  // Delete an event
  deleteEvent: async (id) => {
    const before = get().events.list;
    set(state => ({ events: { ...state.events, list: state.events.list.filter(e => e._id !== id) } }));
    try {
      const resp = await api.delete(`/admin/events/${id}`);
      return { ok: true, data: resp.data };
    } catch (err) {
      // rollback on failure
      set(state => ({ events: { ...state.events, list: before } }));
      const message = err?.response?.data?.message || err.message || 'Delete event failed';
      console.error('deleteEvent error:', message);
      return { ok: false, error: message };
    }
  }
});
