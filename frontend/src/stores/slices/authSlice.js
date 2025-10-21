import API from '../api'

export const createAuthSlice = (set, get) => ({
  user: null,
  loading: false,
  error: null,


  // internal helpers
  _setLoading: (v) => set({ loading: v }),
  _setError: (err) => set({ error: err }),
  _setUser: (user) => set({ user }),

  // Sign up and set cookies via backend (backend will set httpOnly cookies)
  signup: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      // backend returns user object (your backend returns _id/name/email/role)
      set({ user: res.data, loading: false });
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Signup failed";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // Login -> backend sets cookies. Store user returned by backend.
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/admin/auth/login", { email, password });
      set({ user: res.data, loading: false, error: res.status });
      return { ok: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // Logout -> backend clears cookies
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await API.post("/auth/logout"); // or GET depending on your backend
      set({ user: null, loading: false });
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Logout failed";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },









  // state
  // auth: {
  //   user: null,
  //   accessToken: null,
  //   refreshToken: null,
  //   loading: false,
  //   error: null
  // },

  // // actions
  // setAuth: (accessToken, refreshToken = null, user = null) => {
  //   set(state => ({ auth: { ...state.auth, accessToken, refreshToken, user, error: null } }), false, 'auth/setAuth');
  //   try {
  //     if (accessToken) localStorage.setItem('sg_accessToken', accessToken);
  //     else localStorage.removeItem('sg_accessToken');
  //   } catch (e) {}
  // },

  // login: async (email, password) => {
  //   set(state => ({ auth: { ...state.auth, loading: true, error: null } }), false, 'auth/login/start');
  //   try {
  //     const resp = await API.request('/admin/auth/login', { method: 'POST', body: { email, password } });
  //     console.log("Login response:", resp);
  //     if (!resp.ok) {
  //       set(state => ({ auth: { user: resp.data , loading: false, error: resp.status } }), false, 'auth/login/fail');
  //       return { ok: false, error: resp.data || resp.status };
  //     }
  //     const { accessToken, refreshToken, user } = resp.data;
  //     get().setAuth(accessToken, refreshToken || null, user || null);
  //     set(state => ({ auth: { ...state.auth, loading: false } }), false, 'auth/login/success');
  //     return { ok: true, data: resp.data };
  //   } catch (err) {
  //     set(state => ({ auth: { ...state.auth, loading: false, error: err.message } }), false, 'auth/login/error');
  //     return { ok: false, error: err.message };
  //   }
  // },

  // logout: async () => {
  //   try { await API.request('/auth/logout', { method: 'POST' }); } catch (e) {}
  //   get().setAuth(null, null, null);
  //   set(() => ({ auth: { user: null, accessToken: null, refreshToken: null, loading: false, error: null } }), false, 'auth/logout/clear');
  // },

  // refreshToken: async () => {
  //   const { refreshToken } = get().auth;
  //   if (!refreshToken) return { ok: false, error: 'no refresh token' };
  //   try {
  //     const resp = await API.request('/auth/refresh', { method: 'POST', body: { refreshToken } });
  //     if (!resp.ok) return { ok: false, error: resp.data || resp.status };
  //     const { accessToken, refreshToken: newRefresh, user } = resp.data;
  //     get().setAuth(accessToken, newRefresh || refreshToken, user || get().auth.user);
  //     return { ok: true, data: resp.data };
  //   } catch (err) {
  //     return { ok: false, error: err.message };
  //   }
  // }
});

let refreshPromise = null;

API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = userStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				userStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);