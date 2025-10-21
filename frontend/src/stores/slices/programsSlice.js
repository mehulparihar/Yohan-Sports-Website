import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;
  if (d && Array.isArray(d.data)) return d.data;
  if (Array.isArray(resp)) return resp;
  return [];
};

export const createProgramsSlice = (set, get) => ({
  programs: { list: [], loading: false, error: null },

  _setPrograms: (partial) => set(state => ({ programs: { ...state.programs, ...partial } })),
  _setProgramsList: (list) => set(state => ({ programs: { ...state.programs, list } })),

  fetchPrograms: async (opts = {}) => {
    get()._setPrograms({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    try {
      const resp = await api.get(`/programs${q}`);
      const list = extractArray(resp);
      get()._setProgramsList(list);
      get()._setPrograms({ loading: false });
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch programs failed';
      get()._setPrograms({ loading: false, error: message });
      console.error('fetchPrograms error:', message);
      return { ok: false, error: message };
    }
  },

  createProgram: async (payload) => {
    get()._setPrograms({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.post('/admin/programs', payload)
        : await api.post('/admin/programs', payload);

      set(state => ({ programs: { ...state.programs, list: [resp.data, ...state.programs.list] } }));
      get()._setPrograms({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create program failed';
      get()._setPrograms({ loading: false, error: message });
      console.error('createProgram error:', message);
      return { ok: false, error: message };
    }
  },

  updateProgram: async (id, payload) => {
    get()._setPrograms({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.put(`/admin/programs/${id}`, payload)
        : await api.put(`/admin/programs/${id}`, payload);

      set(state => ({
        programs: {
          ...state.programs,
          list: state.programs.list.map(p => (p._id === id ? resp.data : p))
        }
      }));
      get()._setPrograms({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Update program failed';
      get()._setPrograms({ loading: false, error: message });
      console.error('updateProgram error:', message);
      return { ok: false, error: message };
    }
  },

  deleteProgram: async (id) => {
    const before = get().programs.list;
    set(state => ({ programs: { ...state.programs, list: state.programs.list.filter(p => p._id !== id) } }));
    try {
      const resp = await api.delete(`/admin/programs/${id}`);
      return { ok: true, data: resp.data };
    } catch (err) {
      set(state => ({ programs: { ...state.programs, list: before } }));
      const message = err?.response?.data?.message || err.message || 'Delete program failed';
      console.error('deleteProgram error:', message);
      return { ok: false, error: message };
    }
  }
});
