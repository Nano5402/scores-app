import api from './api'

export const playerService = {
  getAll:  (params = {}) => api.get('/players',      { params }),
  getById: (id)          => api.get(`/players/${id}`),
}