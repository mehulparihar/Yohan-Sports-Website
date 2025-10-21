import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;
  if (d && Array.isArray(d.data)) return d.data;
  if (Array.isArray(resp)) return resp;
  return [];
};

export const createEnquiriesSlice = (set, get) => ({
  enquiries: { list: [], loading: false, error: null },

  _setEnquiries: (partial) => set(state => ({ enquiries: { ...state.enquiries, ...partial } })),
  _setEnquiriesList: (list) => set(state => ({ enquiries: { ...state.enquiries, list } })),

  fetchEnquiries: async (opts = {}) => {
    get()._setEnquiries({ loading: true, error: null });
    const q = opts.status ? `?status=${encodeURIComponent(opts.status)}` : '';
    try {
      const resp = await api.get(`/admin/enquiries${q}`);
      const list = extractArray(resp);
      get()._setEnquiriesList(list);
      get()._setEnquiries({ loading: false });
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch enquiries failed';
      get()._setEnquiries({ loading: false, error: message });
      console.error('fetchEnquiries error:', message);
      return { ok: false, error: message };
    }
  },

  createEnquiry: async (payload) => {
    get()._setEnquiries({ loading: true, error: null });
    try {
      const resp = await api.post('/enquiries', payload);
      set(state => ({ enquiries: { ...state.enquiries, list: [resp.data, ...state.enquiries.list] } }));
      get()._setEnquiries({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create enquiry failed';
      get()._setEnquiries({ loading: false, error: message });
      console.error('createEnquiry error:', message);
      return { ok: false, error: message };
    }
  },

  respondEnquiry: async (id, responseBody) => {
    get()._setEnquiries({ loading: true, error: null });
    try {
      const resp = await api.put(`/admin/enquiries/${id}`, { response: responseBody, status: 'responded' });
      set(state => ({
        enquiries: {
          ...state.enquiries,
          list: state.enquiries.list.map(en => (en._id === id ? resp.data : en))
        }
      }));
      get()._setEnquiries({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Respond enquiry failed';
      get()._setEnquiries({ loading: false, error: message });
      console.error('respondEnquiry error:', message);
      return { ok: false, error: message };
    }
  },

  resolveEnquiry: async (id) => {
    get()._setEnquiries({ loading: true, error: null });
    try {
      const resp = await api.put(`/admin/enquiries/${id}`, { status: 'resolved' });
      set(state => ({
        enquiries: {
          ...state.enquiries,
          list: state.enquiries.list.map(en => (en._id === id ? resp.data : en))
        }
      }));
      get()._setEnquiries({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Resolve enquiry failed';
      get()._setEnquiries({ loading: false, error: message });
      console.error('resolveEnquiry error:', message);
      return { ok: false, error: message };
    }
  }
});
