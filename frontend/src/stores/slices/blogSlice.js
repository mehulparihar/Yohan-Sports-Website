import api from '../api'; // axios instance with withCredentials:true

const extractArray = (resp) => {
  if (!resp) return [];
  const d = resp.data;
  if (Array.isArray(d)) return d;                // resp.data = [...]
  if (d && Array.isArray(d.data)) return d.data; // resp.data = { data: [...] }
  if (Array.isArray(resp)) return resp;          // fallback
  return [];
};

export const createBlogSlice = (set, get) => ({
  blogs: { list: [], loading: false, error: null },

  _setBlogs: (partial) => set(state => ({ blogs: { ...state.blogs, ...partial } })),
  _setBlogsList: (list) => set(state => ({ blogs: { ...state.blogs, list } })),

  // Fetch all blogs
  fetchBlogs: async (opts = {}) => {
    get()._setBlogs({ loading: true, error: null });
    const q = opts.q ? `?q=${encodeURIComponent(opts.q)}` : '';
    try {
      const resp = await api.get(`/blogs${q}`);
      const list = extractArray(resp);
      get()._setBlogsList(list);
      get()._setBlogs({ loading: false });
      console.log('Fetched blogs (normalized):', list);
      return { ok: true, data: list };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Fetch blogs failed';
      get()._setBlogs({ loading: false, error: message });
      console.error('fetchBlogs error:', message);
      return { ok: false, error: message };
    }
  },

  // Create new blog
  createBlog: async (payload) => {
    get()._setBlogs({ loading: true, error: null });
    try {
      const isForm = payload instanceof FormData;
      const resp = isForm
        ? await api.post('/admin/blogs', payload) // axios handles FormData automatically
        : await api.post('/admin/blogs', payload);

      // Add new blog at start of list
      set(state => ({ blogs: { ...state.blogs, list: [resp.data, ...state.blogs.list] } }));
      get()._setBlogs({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Create blog failed';
      get()._setBlogs({ loading: false, error: message });
      console.error('createBlog error:', message);
      return { ok: false, error: message };
    }
  },

  // Update blog
  updateBlog: async (id, payload) => {
    get()._setBlogs({ loading: true, error: null });
    try {
      const resp = payload instanceof FormData
        ? await api.put(`/admin/blogs/${id}`, payload)
        : await api.put(`/admin/blogs/${id}`, payload);

      set(state => ({
        blogs: {
          ...state.blogs,
          list: state.blogs.list.map(b => (b._id === id ? resp.data : b))
        }
      }));
      get()._setBlogs({ loading: false });
      return { ok: true, data: resp.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Update blog failed';
      get()._setBlogs({ loading: false, error: message });
      console.error('updateBlog error:', message);
      return { ok: false, error: message };
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    const before = get().blogs.list;
    set(state => ({ blogs: { ...state.blogs, list: state.blogs.list.filter(b => b._id !== id) } }));
    try {
      const resp = await api.delete(`/admin/blogs/${id}`);
      return { ok: true, data: resp.data };
    } catch (err) {
      // rollback
      set(state => ({ blogs: { ...state.blogs, list: before } }));
      const message = err?.response?.data?.message || err.message || 'Delete blog failed';
      console.error('deleteBlog error:', message);
      return { ok: false, error: message };
    }
  }
});
