const DEFAULT_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

export const API = {
  baseUrl: DEFAULT_BASE,
  getAuthToken() {
    try { return localStorage.getItem('sg_accessToken'); } catch (e) { return null; }
  },

  async request(path, { method = 'GET', body = null, headers = {}, raw = false } = {}) {
    const url = `${this.baseUrl}${path}`;
    const token = this.getAuthToken();
    const opts = { method, headers: { ...headers } };
    if (token) opts.headers.Authorization = `Bearer ${token}`;

    if (body && !(body instanceof FormData) && !raw) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    } else if (body) {
      // FormData or raw body
      opts.body = body;
    }

    const res = await fetch(url, opts);
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    return { ok: res.ok, status: res.status, data };
  }
};

export default API;
