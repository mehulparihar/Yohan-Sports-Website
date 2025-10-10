import API from './api'

export const createEventsSlice = (set, get) => ({
  events: { list: [], loading: false, error: null },

  _setEvents: (partial) => set(state => ({ events: { ...state.events, ...partial } })),
  _setEventsList: (list) => set(state => ({ events: { ...state.events, list } })),

  fetchEvents: async (opts = {}) => {
    get()._setEvents({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    const resp = await API.request(`/events${q}`);
    if (!resp.ok) { get()._setEvents({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    get()._setEventsList(resp.data || []);
    get()._setEvents({ loading: false });
    return { ok: true, data: resp.data };
  },

  createEvent: async (payload) => {
    get()._setEvents({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request('/admin/events', { method: 'POST', body: payload, raw: isForm });
      if (!resp.ok) { get()._setEvents({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ events: { ...state.events, list: [resp.data, ...state.events.list] } }));
      get()._setEvents({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setEvents({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  updateEvent: async (id, payload) => {
    get()._setEvents({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request(`/admin/events/${id}`, { method: 'PUT', body: payload, raw: isForm });
      if (!resp.ok) { get()._setEvents({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ events: { ...state.events, list: state.events.list.map(e => (e._id === id ? resp.data : e)) } }));
      get()._setEvents({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setEvents({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  deleteEvent: async (id) => {
    const before = get().events.list;
    set(state => ({ events: { ...state.events, list: state.events.list.filter(e => e._id !== id) } }));
    const resp = await API.request(`/admin/events/${id}`, { method: 'DELETE' });
    if (!resp.ok) { set(state => ({ events: { ...state.events, list: before } })); return { ok: false, error: resp.data || resp.status }; }
    return { ok: true, data: resp.data };
  }
});
