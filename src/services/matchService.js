import api from './api'

export const matchService = {
  getAll:    (params = {}) => api.get('/matches',     { params }),
  getById:   (id)          => api.get(`/matches/${id}`),
  getLive:   ()            => api.get('/matches',     { params: { estado: 'live' } }),
  getUpcoming: ()          => api.get('/matches',     { params: { estado: 'upcoming' } }),
  getFinished: ()          => api.get('/matches',     { params: { estado: 'finished' } }),
}