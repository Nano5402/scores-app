import api from './api'

export const userService = {
  getAll: (params = {}) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  updateRole: (id, rol) => api.put(`/users/${id}/rol`, { rol }),
  updateMe: (data) => api.put('/users/me', data),
  getMe: () => api.get('/users/me'),
}
