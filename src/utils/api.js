// Utility for making API requests with JWT auth
function getApiBase() {
  if (process.env.REACT_APP_API_URL !== undefined && process.env.REACT_APP_API_URL !== '') {
    return process.env.REACT_APP_API_URL;
  }
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:5001';
  }
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL;
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/en')) {
    return '/en';
  }
  return '';
}
const BASE_URL = getApiBase();

export async function apiRequest(path, options = {}) {
  // Rewrite legacy login endpoint to new one
  if (path === '/login') path = '/api/auth/login';
  const token = localStorage.getItem('jwt_token');
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API error');
  }
  return response.json().catch(() => ({}));
}
// Usage: await apiRequest('/api/tasks', { method: 'GET' }) 