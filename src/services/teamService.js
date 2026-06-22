import api from './api'

export const teamService = {
  getAll:  (params = {}) => api.get('/teams',      { params }),
  getById: (id)          => api.get(`/teams/${id}`),
}