import API from '../api'

export const createAuthSlice = (set, get) => ({
  // state
  auth: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  },

  // actions
  setAuth: (accessToken, refreshToken = null, user = null) => {
    set(state => ({ auth: { ...state.auth, accessToken, refreshToken, user, error: null } }), false, 'auth/setAuth');
    try {
      if (accessToken) localStorage.setItem('sg_accessToken', accessToken);
      else localStorage.removeItem('sg_accessToken');
    } catch (e) {}
  },

  login: async (email, password) => {
    set(state => ({ auth: { ...state.auth, loading: true, error: null } }), false, 'auth/login/start');
    try {
      const resp = await API.request('/auth/login', { method: 'POST', body: { email, password } });
      if (!resp.ok) {
        set(state => ({ auth: { ...state.auth, loading: false, error: resp.data || resp.status } }), false, 'auth/login/fail');
        return { ok: false, error: resp.data || resp.status };
      }
      const { accessToken, refreshToken, user } = resp.data;
      get().setAuth(accessToken, refreshToken || null, user || null);
      set(state => ({ auth: { ...state.auth, loading: false } }), false, 'auth/login/success');
      return { ok: true, data: resp.data };
    } catch (err) {
      set(state => ({ auth: { ...state.auth, loading: false, error: err.message } }), false, 'auth/login/error');
      return { ok: false, error: err.message };
    }
  },

  logout: async () => {
    try { await API.request('/auth/logout', { method: 'POST' }); } catch (e) {}
    get().setAuth(null, null, null);
    set(() => ({ auth: { user: null, accessToken: null, refreshToken: null, loading: false, error: null } }), false, 'auth/logout/clear');
  },

  refreshToken: async () => {
    const { refreshToken } = get().auth;
    if (!refreshToken) return { ok: false, error: 'no refresh token' };
    try {
      const resp = await API.request('/auth/refresh', { method: 'POST', body: { refreshToken } });
      if (!resp.ok) return { ok: false, error: resp.data || resp.status };
      const { accessToken, refreshToken: newRefresh, user } = resp.data;
      get().setAuth(accessToken, newRefresh || refreshToken, user || get().auth.user);
      return { ok: true, data: resp.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
});