// Single source for API base URL. Set REACT_APP_API_BASE_URL in env (Render, MilesWeb, etc.).
// Dev: unset = localhost:5001. Prod: unset = same-origin ('').
const API_BASE =
  process.env.REACT_APP_API_BASE_URL !== undefined && process.env.REACT_APP_API_BASE_URL !== ''
    ? process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '')
    : process.env.NODE_ENV !== 'production'
      ? 'http://localhost:5001'
      : '';

export default API_BASE;

export async function apiRequest(path, options = {}) {
  if (path === '/login') path = '/api/auth/login';
  const token = localStorage.getItem('jwt_token');
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API error');
  }
  return response.json().catch(() => ({}));
}
