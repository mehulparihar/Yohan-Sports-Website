import API from './api'

export const createEnquiriesSlice = (set, get) => ({
  enquiries: { list: [], loading: false, error: null },

  _setEnquiries: (partial) => set(state => ({ enquiries: { ...state.enquiries, ...partial } })),
  _setEnquiriesList: (list) => set(state => ({ enquiries: { ...state.enquiries, list } })),

  fetchEnquiries: async (opts = {}) => {
    get()._setEnquiries({ loading: true, error: null });
    const q = opts.status ? `?status=${encodeURIComponent(opts.status)}` : '';
    const resp = await API.request(`/admin/enquiries${q}`);
    if (!resp.ok) { get()._setEnquiries({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    get()._setEnquiriesList(resp.data || []);
    get()._setEnquiries({ loading: false });
    return { ok: true, data: resp.data };
  },

  createEnquiry: async (payload) => {
    get()._setEnquiries({ loading: true, error: null });
    const resp = await API.request('/enquiries', { method: 'POST', body: payload });
    if (!resp.ok) { get()._setEnquiries({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    set(state => ({ enquiries: { ...state.enquiries, list: [resp.data, ...state.enquiries.list] } }));
    get()._setEnquiries({ loading: false });
    return { ok: true, data: resp.data };
  },

  respondEnquiry: async (id, responseBody) => {
    get()._setEnquiries({ loading: true, error: null });
    const resp = await API.request(`/admin/enquiries/${id}`, { method: 'PUT', body: { response: responseBody, status: 'responded' } });
    if (!resp.ok) { get()._setEnquiries({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    set(state => ({ enquiries: { ...state.enquiries, list: state.enquiries.list.map(en => (en._id === id ? resp.data : en)) } }));
    get()._setEnquiries({ loading: false });
    return { ok: true, data: resp.data };
  },

  resolveEnquiry: async (id) => {
    get()._setEnquiries({ loading: true, error: null });
    const resp = await API.request(`/admin/enquiries/${id}`, { method: 'PUT', body: { status: 'resolved' } });
    if (!resp.ok) { get()._setEnquiries({ loading: false, error: resp.data || resp.status }); return { ok: false, error: resp.data || resp.status }; }
    set(state => ({ enquiries: { ...state.enquiries, list: state.enquiries.list.map(en => (en._id === id ? resp.data : en)) } }));
    get()._setEnquiries({ loading: false });
    return { ok: true, data: resp.data };
  }
});