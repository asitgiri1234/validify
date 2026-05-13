import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = {
  login: () => api.get('/auth/login'),
  session: () => api.get('/auth/session'),
  logout: () => api.post('/logout'),
};

export const validationApi = {
  getRules: () => api.get('/validation-rules'),
  toggleRule: (id) => api.post('/toggle-rule', { id }),
  toggleAll: (active) => api.post('/toggle-all', { active }),
  deploy: () => api.post('/deploy'),
};

export default api;
