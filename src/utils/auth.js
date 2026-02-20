// Authentication utility functions

export function setToken(token) {
  localStorage.setItem('jwt_token', token);
}

export function getToken() {
  return localStorage.getItem('jwt_token');
}

export function removeToken() {
  localStorage.removeItem('jwt_token');
}

export function isLoggedIn() {
  return !!getToken();
}

export function getUserRole() {
  const payload = getToken()?.split('.')[1];
  if (!payload) return null;
  try {
    return JSON.parse(atob(payload)).role;
  } catch {
    return null;
  }
}
// Usage: if (isLoggedIn()) { ... } or getUserRole() === 'Admin' 