import API from './api'

export const createProgramsSlice = (set, get) => ({
  programs: { list: [], loading: false, error: null },

  // helpers
  _setPrograms: (partial) => set(state => ({ programs: { ...state.programs, ...partial } })),
  _setProgramsList: (list) => set(state => ({ programs: { ...state.programs, list } })),

  fetchPrograms: async (opts = {}) => {
    get()._setPrograms({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    const resp = await API.request(`/programs${q}`);
    if (!resp.ok) { get()._setPrograms({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    get()._setProgramsList(resp.data || []);
    get()._setPrograms({ loading: false });
    return { ok: true, data: resp.data };
  },

  createProgram: async (payload) => {
    get()._setPrograms({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request('/admin/programs', { method: 'POST', body: payload, raw: isForm });
      if (!resp.ok) { get()._setPrograms({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ programs: { ...state.programs, list: [resp.data, ...state.programs.list] } }));
      get()._setPrograms({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setPrograms({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  updateProgram: async (id, payload) => {
    get()._setPrograms({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = await API.request(`/admin/programs/${id}`, { method: 'PUT', body: payload, raw: isForm });
      if (!resp.ok) { get()._setPrograms({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
      set(state => ({ programs: { ...state.programs, list: state.programs.list.map(p => (p._id === id ? resp.data : p)) } }));
      get()._setPrograms({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      get()._setPrograms({ loading: false, error: err.message });
      return { ok: false, error: err.message };
    }
  },

  deleteProgram: async (id) => {
    const before = get().programs.list;
    set(state => ({ programs: { ...state.programs, list: state.programs.list.filter(p => p._id !== id) } }));
    const resp = await API.request(`/admin/programs/${id}`, { method: 'DELETE' });
    if (!resp.ok) { set(state => ({ programs: { ...state.programs, list: before } })); return { ok: false, error: resp.data || resp.status }; }
    return { ok: true, data: resp.data };
  }
});