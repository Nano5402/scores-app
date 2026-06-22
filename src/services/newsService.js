import api from './api'

export const newsService = {
  getAll:  (params = {}) => api.get('/news',      { params }),
  getById: (id)          => api.get(`/news/${id}`),
}