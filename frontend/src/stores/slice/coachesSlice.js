import API from '../api'

export const createCoachesSlice = (set, get) => ({
  coaches: { list: [], loading: false, error: null },

  _setCoaches: (partial) => set(state => ({ coaches: { ...state.coaches, ...partial } })),
  _setCoachesList: (list) => set(state => ({ coaches: { ...state.coaches, list } })),

  fetchCoaches: async (opts = {}) => {
    get()._setCoaches({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    const resp = await API.request(`/coaches${q}`);
    if (!resp.ok) { get()._setCoaches({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    get()._setCoachesList(resp.data || []);
    get()._setCoaches({ loading: false });
    return { ok: true, data: resp.data };
  },

  createCoach: async (payload) => {
    get()._setCoaches({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request('/admin/coaches', { method: 'POST', body: payload, raw: isForm });
      if (!resp.ok) { get()._setCoaches({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ coaches: { ...state.coaches, list: [resp.data, ...state.coaches.list] } }));
      get()._setCoaches({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setCoaches({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  updateCoach: async (id, payload) => {
    get()._setCoaches({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request(`/admin/coaches/${id}`, { method: 'PUT', body: payload, raw: isForm });
      if (!resp.ok) { get()._setCoaches({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ coaches: { ...state.coaches, list: state.coaches.list.map(c => (c._id === id ? resp.data : c)) } }));
      get()._setCoaches({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setCoaches({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  deleteCoach: async (id) => {
    const before = get().coaches.list;
    set(state => ({ coaches: { ...state.coaches, list: state.coaches.list.filter(c => c._id !== id) } }));
    const resp = await API.request(`/admin/coaches/${id}`, { method: 'DELETE' });
    if (!resp.ok) { set(state => ({ coaches: { ...state.coaches, list: before } })); return { ok: false, error: resp.data || resp.status }; }
    return { ok: true, data: resp.data };
  }
});